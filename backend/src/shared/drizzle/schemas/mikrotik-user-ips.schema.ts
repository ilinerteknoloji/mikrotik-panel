import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";
import { usersSchema } from "./users.schema";
import { InferSelectModel, relations } from "drizzle-orm";

export const mikrotikUserIpsSchema = mysqlTable("mikrotik_user_ips", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id")
    .notNull()
    .references(() => usersSchema.id),
  ip: text("ip").notNull(),
  status: boolean("status").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const mikrotikUserIpsRelations = relations(
  mikrotikUserIpsSchema,
  ({ one }) => ({
    user: one(usersSchema, {
      fields: [mikrotikUserIpsSchema.userId],
      references: [usersSchema.id],
    }),
  }),
);

export type MikrotikUserIpsSchemaType = InferSelectModel<
  typeof mikrotikUserIpsSchema
>;
export type MikrotikUserIpsSchemaInsertType = InferSelectModel<
  typeof mikrotikUserIpsSchema
>;
