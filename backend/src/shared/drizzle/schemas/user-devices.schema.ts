import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { int, mysqlTable, timestamp } from "drizzle-orm/mysql-core";
import {
  devicesSchema,
  logsSchema,
  userDevicesRefreshTokensSchema,
  usersSchema,
} from ".";
import { ipsSchema } from ".";

export const userDevicesSchema = mysqlTable("user_device", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id")
    .notNull()
    .references(() => usersSchema.id),
  deviceId: int("device_id")
    .notNull()
    .references(() => devicesSchema.id),
  ipId: int("ip_id")
    .notNull()
    .references(() => ipsSchema.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userDevicesRelations = relations(
  userDevicesSchema,
  ({ one, many }) => ({
    user: one(usersSchema, {
      fields: [userDevicesSchema.userId],
      references: [usersSchema.id],
    }),
    device: one(devicesSchema, {
      fields: [userDevicesSchema.deviceId],
      references: [devicesSchema.id],
    }),
    ip: one(ipsSchema, {
      fields: [userDevicesSchema.ipId],
      references: [ipsSchema.id],
    }),
    userDevicesRefreshTokens: many(userDevicesRefreshTokensSchema),
    logs: many(logsSchema),
  }),
);

export type UserDevicesSchemaType = InferSelectModel<typeof userDevicesSchema>;
export type UserDevicesSchemaInsertType = InferInsertModel<
  typeof userDevicesSchema
>;
