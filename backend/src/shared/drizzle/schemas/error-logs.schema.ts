import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

export const errorLogsSchema = mysqlTable("error_logs", {
  id: int("id").primaryKey().autoincrement(),
  message: text("message").notNull(),
  status: boolean("status").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type ErrorLogsSchemaType = InferSelectModel<typeof errorLogsSchema>;
export type ErrorLogsSchemaInsertType = InferInsertModel<
  typeof errorLogsSchema
>;
