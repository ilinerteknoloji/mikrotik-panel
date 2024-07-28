import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const rdnsHostsSchema = mysqlTable("rdns_hosts", {
  id: int("id").primaryKey().autoincrement(),
  hostname: varchar("hostname", { length: 255 }).unique().notNull(),
  hostnameMain: varchar("hostname_main", { length: 255 }).unique().notNull(),
  status: boolean("status").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type RdnsHostsSchemaType = InferSelectModel<typeof rdnsHostsSchema>;
export type RdnsHostsSchemaInsertType = InferInsertModel<
  typeof rdnsHostsSchema
>;
