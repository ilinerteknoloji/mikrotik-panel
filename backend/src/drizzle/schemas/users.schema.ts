import { relations } from "drizzle-orm";
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
  first_name: varchar("first_name", { length: 50 }).notNull(),
  last_name: varchar("last_name", { length: 50 }).notNull(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  phoneNumber: varchar("phoneNumber", { length: 20 }).notNull().unique(),
  password: varchar("password", { length: 100 }).notNull(),
  status: boolean("status").default(true),
  role: mysqlEnum("role", ["admin", "user"]).default("user"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const usersRelations = relations(usersSchema, ({ one }) => ({
  details: one(usersDetailsSchema, {
    fields: [usersSchema.id],
    references: [usersDetailsSchema.user_id],
  }),
}));
