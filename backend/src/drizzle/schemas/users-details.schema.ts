import { relations } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { usersSchema } from ".";

export const usersDetailsSchema = mysqlTable("users_details", {
  id: int("id").primaryKey().autoincrement(),
  user_id: int("user_id").notNull().unique(),
  address: varchar("address", { length: 255 }),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 255 }),
  country: varchar("country", { length: 255 }),
  zip_code: varchar("zip_code", { length: 10 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const usersDetailsRelations = relations(
  usersDetailsSchema,
  ({ one }) => ({
    user: one(usersSchema, {
      fields: [usersDetailsSchema.user_id],
      references: [usersSchema.id],
    }),
  }),
);
