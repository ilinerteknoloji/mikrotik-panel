import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { usersDetailsSchema } from ".";

export const usersSchema = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  phoneNumber: varchar("phoneNumber", { length: 20 }).notNull().unique(),
  password: varchar("password", { length: 100 }).notNull(),
  status: boolean("status").default(true),
  role: mysqlEnum("role", ["admin", "user"]).default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const usersRelations = relations(usersSchema, ({ one }) => ({
  details: one(usersDetailsSchema, {
    fields: [usersSchema.id],
    references: [usersDetailsSchema.userId],
  }),
}));

export type UsersSchemaType = InferSelectModel<typeof usersSchema>;
export type UsersSchemaInsertType = InferInsertModel<typeof usersSchema>;
