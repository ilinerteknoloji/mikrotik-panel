import { relations } from "drizzle-orm/relations";
import { refresh_token, access_token, users, complains, feedbacks, ip_categories, firewall_address_list, user_details, devices, user_device, ips, user_devices_refresh_tokens } from "./schema";

export const access_tokenRelations = relations(access_token, ({one}) => ({
	refresh_token: one(refresh_token, {
		fields: [access_token.refresh_token_id],
		references: [refresh_token.id]
	}),
	user: one(users, {
		fields: [access_token.user_id],
		references: [users.id]
	}),
}));

export const refresh_tokenRelations = relations(refresh_token, ({one, many}) => ({
	access_tokens: many(access_token),
	user: one(users, {
		fields: [refresh_token.user_id],
		references: [users.id]
	}),
	user_devices_refresh_tokens: many(user_devices_refresh_tokens),
}));

export const usersRelations = relations(users, ({many}) => ({
	access_tokens: many(access_token),
	complains: many(complains),
	feedbacks: many(feedbacks),
	refresh_tokens: many(refresh_token),
	user_details: many(user_details),
	user_devices: many(user_device),
}));

export const complainsRelations = relations(complains, ({one}) => ({
	user: one(users, {
		fields: [complains.user_id],
		references: [users.id]
	}),
}));

export const feedbacksRelations = relations(feedbacks, ({one}) => ({
	user: one(users, {
		fields: [feedbacks.user_id],
		references: [users.id]
	}),
}));

export const firewall_address_listRelations = relations(firewall_address_list, ({one}) => ({
	ip_category: one(ip_categories, {
		fields: [firewall_address_list.ip_categories_id],
		references: [ip_categories.id]
	}),
}));

export const ip_categoriesRelations = relations(ip_categories, ({many}) => ({
	firewall_address_lists: many(firewall_address_list),
}));

export const user_detailsRelations = relations(user_details, ({one}) => ({
	user: one(users, {
		fields: [user_details.user_id],
		references: [users.id]
	}),
}));

export const user_deviceRelations = relations(user_device, ({one, many}) => ({
	device: one(devices, {
		fields: [user_device.device_id],
		references: [devices.id]
	}),
	ip: one(ips, {
		fields: [user_device.ip_id],
		references: [ips.id]
	}),
	user: one(users, {
		fields: [user_device.user_id],
		references: [users.id]
	}),
	user_devices_refresh_tokens: many(user_devices_refresh_tokens),
}));

export const devicesRelations = relations(devices, ({many}) => ({
	user_devices: many(user_device),
}));

export const ipsRelations = relations(ips, ({many}) => ({
	user_devices: many(user_device),
}));

export const user_devices_refresh_tokensRelations = relations(user_devices_refresh_tokens, ({one}) => ({
	refresh_token: one(refresh_token, {
		fields: [user_devices_refresh_tokens.refresh_token_id],
		references: [refresh_token.id]
	}),
	user_device: one(user_device, {
		fields: [user_devices_refresh_tokens.user_devices_id],
		references: [user_device.id]
	}),
}));