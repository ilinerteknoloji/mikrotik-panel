import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { int, mysqlTable, text, timestamp } from "drizzle-orm/mysql-core";
import { ipsSchema, userDevicesSchema } from ".";

export const logsSchema = mysqlTable("logs", {
  id: int("id").primaryKey().autoincrement(),
  userDeviceId: int("user_device_id").references(() => userDevicesSchema.id),
  ipId: int("ip_id")
    .notNull()
    .references(() => ipsSchema.id),
  message: text("message").notNull(),
  time: timestamp("time").defaultNow(),
});

export const logsRelations = relations(logsSchema, ({ one }) => ({
  userDevice: one(userDevicesSchema, {
    fields: [logsSchema.userDeviceId],
    references: [userDevicesSchema.id],
  }),
  ip: one(ipsSchema, {
    fields: [logsSchema.ipId],
    references: [ipsSchema.id],
  }),
}));

export type LogsSchemaType = InferSelectModel<typeof logsSchema>;
export type LogsSchemaInsertType = InferInsertModel<typeof logsSchema>;
