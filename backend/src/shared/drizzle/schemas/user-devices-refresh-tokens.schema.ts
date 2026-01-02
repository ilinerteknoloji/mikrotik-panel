import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { int, mysqlTable, timestamp } from "drizzle-orm/mysql-core";
import { refreshTokenSchema, userDevicesSchema } from ".";

export const userDevicesRefreshTokensSchema = mysqlTable(
  "user_devices_refresh_tokens",
  {
    id: int("id").primaryKey().autoincrement(),
    userDevicesId: int("user_devices_id")
      .notNull()
      .references(() => userDevicesSchema.id),
    refreshToken_id: int("refresh_token_id")
      .notNull()
      .references(() => refreshTokenSchema.id),
    createdAt: timestamp("created_at").defaultNow(),
  },
);

export const userDevicesRefreshTokensRelations = relations(
  userDevicesRefreshTokensSchema,
  ({ one }) => ({
    device: one(userDevicesSchema, {
      fields: [userDevicesRefreshTokensSchema.userDevicesId],
      references: [userDevicesSchema.id],
    }),
    refreshToken: one(refreshTokenSchema, {
      fields: [userDevicesRefreshTokensSchema.refreshToken_id],
      references: [refreshTokenSchema.id],
    }),
  }),
);

export type UserDevicesRefreshTokensSchemaType = InferSelectModel<
  typeof userDevicesRefreshTokensSchema
>;
export type UserDevicesRefreshTokensSchemaInsertType = InferInsertModel<
  typeof userDevicesRefreshTokensSchema
>;
