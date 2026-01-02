import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import {
  accessTokenSchema,
  feedbacksSchema,
  refreshTokenSchema,
  userDevicesSchema,
  userDetailsSchema,
} from ".";

export const usersSchema = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull().unique(),
  password: varchar("password", { length: 100 }).notNull(),
  status: boolean("status").default(false),
  role: mysqlEnum("role", ["admin", "user"]).default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const usersRelations = relations(usersSchema, ({ one, many }) => ({
  details: one(userDetailsSchema, {
    fields: [usersSchema.id],
    references: [userDetailsSchema.userId],
  }),
  refreshToken: many(refreshTokenSchema),
  accessToken: many(accessTokenSchema),
  userDevice: many(userDevicesSchema),
  feedback: many(feedbacksSchema),
  complain: many(feedbacksSchema),
}));

export type UsersSchemaType = InferSelectModel<typeof usersSchema>;
export type UsersSchemaInsertType = InferInsertModel<typeof usersSchema>;
