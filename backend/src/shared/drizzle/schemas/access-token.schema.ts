import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";
import { refreshTokenSchema, usersSchema } from ".";

export const accessTokenSchema = mysqlTable("access_token", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull(),
  refreshTokenId: int("r_token_id").notNull(),
  token: text("token").notNull(),
  status: boolean("status").default(true),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const accessTokenRelations = relations(accessTokenSchema, ({ one }) => ({
  user: one(usersSchema, {
    fields: [accessTokenSchema.userId],
    references: [usersSchema.id],
  }),
  refreshToken: one(refreshTokenSchema, {
    fields: [accessTokenSchema.refreshTokenId],
    references: [refreshTokenSchema.id],
  }),
}));

export type AccessTokenSchemaType = InferSelectModel<typeof accessTokenSchema>;
export type AccessTokenSchemaInsertType = InferInsertModel<
  typeof accessTokenSchema
>;
