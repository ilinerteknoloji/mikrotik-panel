import { relations } from "drizzle-orm/relations";
import { refresh_token, access_token, users, complains, feedbacks, ip_categories, firewall_address_list } from "./schema";

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

export const refresh_tokenRelations = relations(refresh_token, ({many}) => ({
	access_tokens: many(access_token),
}));

export const usersRelations = relations(users, ({many}) => ({
	access_tokens: many(access_token),
	complains: many(complains),
	feedbacks: many(feedbacks),
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