import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";
import { usersSchema } from ".";

export const complainsSchema = mysqlTable("complains", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id")
    .notNull()
    .references(() => usersSchema.id),
  message: text("message").notNull(),
  status: boolean("status").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const complainsRelations = relations(complainsSchema, ({ one }) => ({
  user: one(usersSchema, {
    fields: [complainsSchema.userId],
    references: [usersSchema.id],
  }),
}));

export type ComplainsSchemaType = InferSelectModel<typeof complainsSchema>;
export type ComplainsSchemaInsertType = InferInsertModel<
  typeof complainsSchema
>;
