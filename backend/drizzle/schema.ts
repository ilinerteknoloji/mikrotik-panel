import { mysqlTable, mysqlSchema, AnyMySqlColumn, foreignKey, primaryKey, unique, int, varchar, tinyint, timestamp, text, mysqlEnum } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const access_token = mysqlTable("access_token", {
	id: int("id").autoincrement().notNull(),
	user_id: int("user_id").notNull().references(() => users.id),
	token: varchar("token", { length: 255 }).notNull(),
	status: tinyint("status").default(1),
	expires_at: timestamp("expires_at", { mode: 'string' }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
	updated_at: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).onUpdateNow(),
},
(table) => {
	return {
		access_token_id: primaryKey({ columns: [table.id], name: "access_token_id"}),
		access_token_token_unique: unique("access_token_token_unique").on(table.token),
	}
});

export const complains = mysqlTable("complains", {
	id: int("id").autoincrement().notNull(),
	user_id: int("user_id").notNull().references(() => users.id),
	message: text("message").notNull(),
	status: tinyint("status").default(0),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
	updated_at: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).onUpdateNow(),
},
(table) => {
	return {
		complains_id: primaryKey({ columns: [table.id], name: "complains_id"}),
	}
});

export const devices = mysqlTable("devices", {
	id: int("id").autoincrement().notNull(),
	user_agent: text("user_agent").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
},
(table) => {
	return {
		devices_id: primaryKey({ columns: [table.id], name: "devices_id"}),
	}
});

export const error_logs = mysqlTable("error_logs", {
	id: int("id").autoincrement().notNull(),
	message: text("message").notNull(),
	status: tinyint("status").default(0),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
	updated_at: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).onUpdateNow(),
},
(table) => {
	return {
		error_logs_id: primaryKey({ columns: [table.id], name: "error_logs_id"}),
	}
});

export const feedbacks = mysqlTable("feedbacks", {
	id: int("id").autoincrement().notNull(),
	user_id: int("user_id").notNull().references(() => users.id),
	message: text("message").notNull(),
	status: tinyint("status").default(0),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
	updated_at: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).onUpdateNow(),
},
(table) => {
	return {
		feedbacks_id: primaryKey({ columns: [table.id], name: "feedbacks_id"}),
	}
});

export const ips = mysqlTable("ips", {
	id: int("id").autoincrement().notNull(),
	ip: varchar("ip", { length: 255 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
},
(table) => {
	return {
		ips_id: primaryKey({ columns: [table.id], name: "ips_id"}),
		ips_ip_unique: unique("ips_ip_unique").on(table.ip),
	}
});

export const logs = mysqlTable("logs", {
	id: int("id").autoincrement().notNull(),
	user_device_id: int("user_device_id").references(() => user_device.id),
	ip_id: int("ip_id").notNull().references(() => ips.id),
	message: text("message").notNull(),
	time: timestamp("time", { mode: 'string' }).default(sql`(now())`),
},
(table) => {
	return {
		logs_id: primaryKey({ columns: [table.id], name: "logs_id"}),
	}
});

export const refresh_token = mysqlTable("refresh_token", {
	id: int("id").autoincrement().notNull(),
	user_id: int("user_id").notNull().references(() => users.id),
	token: varchar("token", { length: 255 }).notNull(),
	status: tinyint("status").default(1),
	expires_at: timestamp("expires_at", { mode: 'string' }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
	updated_at: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).onUpdateNow(),
},
(table) => {
	return {
		refresh_token_id: primaryKey({ columns: [table.id], name: "refresh_token_id"}),
		refresh_token_token_unique: unique("refresh_token_token_unique").on(table.token),
	}
});

export const user_details = mysqlTable("user_details", {
	id: int("id").autoincrement().notNull(),
	user_id: int("user_id").notNull().references(() => users.id),
	is_email_verified: tinyint("is_email_verified").default(0),
	is_phone_number_verified: tinyint("is_phone_number_verified").default(0),
	address: varchar("address", { length: 255 }),
	city: varchar("city", { length: 255 }),
	state: varchar("state", { length: 255 }),
	country: varchar("country", { length: 255 }),
	zip_code: varchar("zip_code", { length: 10 }),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
	updated_at: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).onUpdateNow(),
},
(table) => {
	return {
		user_details_id: primaryKey({ columns: [table.id], name: "user_details_id"}),
		user_details_user_id_unique: unique("user_details_user_id_unique").on(table.user_id),
	}
});

export const user_device = mysqlTable("user_device", {
	id: int("id").autoincrement().notNull(),
	user_id: int("user_id").notNull().references(() => users.id),
	device_id: int("device_id").notNull().references(() => devices.id),
	ip_id: int("ip_id").notNull().references(() => ips.id),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
},
(table) => {
	return {
		user_device_id: primaryKey({ columns: [table.id], name: "user_device_id"}),
	}
});

export const user_devices_refresh_tokens = mysqlTable("user_devices_refresh_tokens", {
	id: int("id").autoincrement().notNull(),
	user_devices_id: int("user_devices_id").notNull().references(() => user_device.id),
	refresh_token_id: int("refresh_token_id").notNull().references(() => refresh_token.id),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`(now())`),
},
(table) => {
	return {
		user_devices_refresh_tokens_id: primaryKey({ columns: [table.id], name: "user_devices_refresh_tokens_id"}),
	}
});

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
	updated_at: timestamp("updated_at", { mode: 'string' }).default(sql`(now())`).onUpdateNow(),
},
(table) => {
	return {
		users_id: primaryKey({ columns: [table.id], name: "users_id"}),
		users_username_unique: unique("users_username_unique").on(table.username),
		users_email_unique: unique("users_email_unique").on(table.email),
		users_phoneNumber_unique: unique("users_phoneNumber_unique").on(table.phoneNumber),
	}
});