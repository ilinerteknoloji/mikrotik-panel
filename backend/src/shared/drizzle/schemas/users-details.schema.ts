import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { usersSchema } from ".";

export const usersDetailsSchema = mysqlTable("users_details", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull().unique(),
  isEmailVerified: boolean("is_email_verified").default(false),
  isPhoneNumberVerified: boolean("is_phone_number_verified").default(false),
  address: varchar("address", { length: 255 }),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 255 }),
  country: varchar("country", { length: 255 }),
  zipCode: varchar("zip_code", { length: 10 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const usersDetailsRelations = relations(
  usersDetailsSchema,
  ({ one }) => ({
    user: one(usersSchema, {
      fields: [usersDetailsSchema.userId],
      references: [usersSchema.id],
    }),
  }),
);

export type UsersDetailsSchemaType = InferSelectModel<
  typeof usersDetailsSchema
>;
export type UsersDetailsSchemaInsertType = InferInsertModel<
  typeof usersDetailsSchema
>;
