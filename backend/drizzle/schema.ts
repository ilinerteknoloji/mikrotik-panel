import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, int, varchar, tinyint, mysqlEnum, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const users = mysqlTable("users", {
	id: int("id").autoincrement().notNull(),
	first_name: varchar("first_name", { length: 50 }).notNull(),
	last_name: varchar("last_name", { length: 50 }).notNull(),
	username: varchar("username", { length: 50 }).notNull(),
	email: varchar("email", { length: 100 }).notNull(),
	phoneNumber: varchar("phoneNumber", { length: 20 }).notNull(),
	password: varchar("password", { length: 100 }).notNull(),
	status: tinyint("status").default(1),
	role: mysqlEnum("role", ['admin','user']).default('user'),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
	updated_at: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`),
},
(table) => {
	return {
		users_id: primaryKey({ columns: [table.id], name: "users_id"}),
		users_email_unique: unique("users_email_unique").on(table.email),
		users_phoneNumber_unique: unique("users_phoneNumber_unique").on(table.phoneNumber),
		users_username_unique: unique("users_username_unique").on(table.username),
	}
});

export const users_details = mysqlTable("users_details", {
	id: int("id").autoincrement().notNull(),
	user_id: int("user_id").notNull(),
	address: varchar("address", { length: 255 }),
	city: varchar("city", { length: 255 }),
	state: varchar("state", { length: 255 }),
	country: varchar("country", { length: 255 }),
	zip_code: varchar("zip_code", { length: 10 }),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
	updated_at: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`),
},
(table) => {
	return {
		users_details_id: primaryKey({ columns: [table.id], name: "users_details_id"}),
		users_details_user_id_unique: unique("users_details_user_id_unique").on(table.user_id),
	}
});