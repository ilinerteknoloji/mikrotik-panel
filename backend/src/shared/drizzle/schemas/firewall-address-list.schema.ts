import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { ipCategoriesSchema, mikrotikUserIpsSchema } from ".";

export const firewallAddressListSchema = mysqlTable("firewall_address_list", {
  id: int("id").primaryKey().autoincrement(),
  list: int("ip_categories_id")
    .notNull()
    .references(() => ipCategoriesSchema.id),
  address: int("mikrotik_user_ips_id")
    .notNull()
    .references(() => mikrotikUserIpsSchema.id),
});

export const firewallAddressListRelations = relations(
  firewallAddressListSchema,
  ({ one }) => ({
    ipCategory: one(ipCategoriesSchema, {
      fields: [firewallAddressListSchema.list],
      references: [ipCategoriesSchema.id],
    }),
    address: one(mikrotikUserIpsSchema, {
      fields: [firewallAddressListSchema.address],
      references: [mikrotikUserIpsSchema.id],
    }),
  }),
);

export type FirewallAddressListSchemaType = InferSelectModel<
  typeof firewallAddressListSchema
>;

export type FirewallAddressListSchemaInsertType = InferInsertModel<
  typeof firewallAddressListSchema
>;
