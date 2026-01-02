import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { int, mysqlTable, text, timestamp } from "drizzle-orm/mysql-core";
import { userDevicesSchema } from ".";

export const devicesSchema = mysqlTable("devices", {
  id: int("id").primaryKey().autoincrement(),
  userAgent: text("user_agent").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const deviceRelations = relations(devicesSchema, ({ many }) => ({
  userDevice: many(userDevicesSchema),
}));

export type DevicesSchemaType = InferSelectModel<typeof devicesSchema>;
export type DevicesSchemaInsertType = InferInsertModel<typeof devicesSchema>;
