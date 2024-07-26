import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";
import {
  accessTokenSchema,
  userDevicesRefreshTokensSchema,
  usersSchema,
} from ".";

export const refreshTokenSchema = mysqlTable("refresh_token", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id")
    .notNull()
    .references(() => usersSchema.id),
  token: text("token").notNull(),
  status: boolean("status").default(true),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const refreshTokenRelations = relations(
  refreshTokenSchema,
  ({ one, many }) => ({
    user: one(usersSchema, {
      fields: [refreshTokenSchema.userId],
      references: [usersSchema.id],
    }),
    userDevicesRefreshToken: many(userDevicesRefreshTokensSchema),
    accessToken: one(accessTokenSchema, {
      fields: [refreshTokenSchema.id],
      references: [accessTokenSchema.refreshTokenId],
    }),
  }),
);

export type RefreshTokenSchemaType = InferSelectModel<
  typeof refreshTokenSchema
>;
export type RefreshTokenSchemaInsertType = InferInsertModel<
  typeof refreshTokenSchema
>;
