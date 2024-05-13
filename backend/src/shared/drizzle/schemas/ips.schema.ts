import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { logsSchema, userDevicesSchema } from ".";

export const ipsSchema = mysqlTable("ips", {
  id: int("id").primaryKey().autoincrement(),
  ip: varchar("ip", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ipsRelations = relations(ipsSchema, ({ many }) => ({
  userDevice: many(userDevicesSchema),
  log: many(logsSchema),
}));

export type IpsSchemaType = InferSelectModel<typeof ipsSchema>;
export type IpsSchemaInsertType = InferInsertModel<typeof ipsSchema>;
