import { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const ipCategoriesSchema = mysqlTable("ip_categories", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", {
    length: 100,
  })
    .notNull()
    .unique(),
  description: varchar("description", {
    length: 512,
  }).notNull(),
  status: boolean("status").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export type IpCategoriesSchemaType = InferSelectModel<
  typeof ipCategoriesSchema
>;

export type IpCategoriesSchemaInsertType = InferSelectModel<
  typeof ipCategoriesSchema
>;
