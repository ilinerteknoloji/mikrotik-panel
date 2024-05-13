import { relations } from "drizzle-orm/relations";
import {
  users,
  access_token,
  complains,
  feedbacks,
  ips,
  logs,
  user_device,
  refresh_token,
  devices,
  user_devices_refresh_tokens,
  users_details,
} from "./schema";

export const access_tokenRelations = relations(access_token, ({ one }) => ({
  user: one(users, {
    fields: [access_token.user_id],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  access_tokens: many(access_token),
  complains: many(complains),
  feedbacks: many(feedbacks),
  refresh_tokens: many(refresh_token),
  user_devices: many(user_device),
  users_details: many(users_details),
}));

export const complainsRelations = relations(complains, ({ one }) => ({
  user: one(users, {
    fields: [complains.user_id],
    references: [users.id],
  }),
}));

export const feedbacksRelations = relations(feedbacks, ({ one }) => ({
  user: one(users, {
    fields: [feedbacks.user_id],
    references: [users.id],
  }),
}));

export const logsRelations = relations(logs, ({ one }) => ({
  ip: one(ips, {
    fields: [logs.ip_id],
    references: [ips.id],
  }),
  user_device: one(user_device, {
    fields: [logs.user_device_id],
    references: [user_device.id],
  }),
}));

export const ipsRelations = relations(ips, ({ many }) => ({
  logs: many(logs),
  user_devices: many(user_device),
}));

export const user_deviceRelations = relations(user_device, ({ one, many }) => ({
  logs: many(logs),
  device: one(devices, {
    fields: [user_device.device_id],
    references: [devices.id],
  }),
  ip: one(ips, {
    fields: [user_device.ip_id],
    references: [ips.id],
  }),
  user: one(users, {
    fields: [user_device.user_id],
    references: [users.id],
  }),
  user_devices_refresh_tokens: many(user_devices_refresh_tokens),
}));

export const refresh_tokenRelations = relations(
  refresh_token,
  ({ one, many }) => ({
    user: one(users, {
      fields: [refresh_token.user_id],
      references: [users.id],
    }),
    user_devices_refresh_tokens: many(user_devices_refresh_tokens),
  }),
);

export const devicesRelations = relations(devices, ({ many }) => ({
  user_devices: many(user_device),
}));

export const user_devices_refresh_tokensRelations = relations(
  user_devices_refresh_tokens,
  ({ one }) => ({
    refresh_token: one(refresh_token, {
      fields: [user_devices_refresh_tokens.refresh_token_id],
      references: [refresh_token.id],
    }),
    user_device: one(user_device, {
      fields: [user_devices_refresh_tokens.user_devices_id],
      references: [user_device.id],
    }),
  }),
);

export const users_detailsRelations = relations(users_details, ({ one }) => ({
  user: one(users, {
    fields: [users_details.user_id],
    references: [users.id],
  }),
}));
