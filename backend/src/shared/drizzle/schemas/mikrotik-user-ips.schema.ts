import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";
import { usersSchema } from "./users.schema";
import { InferSelectModel, relations } from "drizzle-orm";
import { firewallAddressListSchema } from "./firewall-address-list.schema";

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
  ({ one, many }) => ({
    user: one(usersSchema, {
      fields: [mikrotikUserIpsSchema.userId],
      references: [usersSchema.id],
      relationName: "mikrotik_user_ips_user_id_fk",
    }),
    addressList: many(firewallAddressListSchema),
  }),
);

export type MikrotikUserIpsSchemaType = InferSelectModel<
  typeof mikrotikUserIpsSchema
>;
export type MikrotikUserIpsSchemaInsertType = InferSelectModel<
  typeof mikrotikUserIpsSchema
>;
