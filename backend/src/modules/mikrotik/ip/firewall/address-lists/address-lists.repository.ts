import { Inject, Injectable } from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import { DRIZZLE_PROVIDER } from "src/lib/constants";
import {
  FirewallAddressListSchemaInsertType,
  FirewallAddressListSchemaType,
  firewallAddressListSchema,
  ipCategoriesSchema,
  mikrotikUserIpsSchema,
} from "src/shared/drizzle/schemas";
import { Drizzle } from "src/types";

@Injectable()
export class AddressListsRepository {
  constructor(@Inject(DRIZZLE_PROVIDER) private readonly drizzle: Drizzle) {}

  public async create({
    address,
    list,
    mikrotikId,
  }: FirewallAddressListSchemaInsertType) {
    return await this.drizzle
      .insert(firewallAddressListSchema)
      .values({ list, address, mikrotikId });
  }

  public async findAllActiveByUserId(userId: number) {
    return await this.drizzle
      .select({
        id: mikrotikUserIpsSchema.id,
        userId: mikrotikUserIpsSchema.userId,
        ip: mikrotikUserIpsSchema.ip,
        status: mikrotikUserIpsSchema.status,
        mikrotikId: firewallAddressListSchema.mikrotikId,
        category: ipCategoriesSchema.title,
        categoryId: ipCategoriesSchema.id,
      })
      .from(firewallAddressListSchema)
      .innerJoin(
        mikrotikUserIpsSchema,
        eq(mikrotikUserIpsSchema.id, firewallAddressListSchema.address),
      )
      .innerJoin(
        ipCategoriesSchema,
        eq(ipCategoriesSchema.id, firewallAddressListSchema.list),
      )
      .where(
        and(
          eq(mikrotikUserIpsSchema.userId, userId),
          eq(mikrotikUserIpsSchema.status, true),
        ),
      );
  }

  public async findAllActive() {
    return await this.drizzle.query.mikrotikUserIpsSchema.findMany({
      where: (fields, { eq }) => eq(fields.status, true),
    });
  }

  public async findById<
    K extends keyof FirewallAddressListSchemaType,
    V extends FirewallAddressListSchemaType[K],
  >(key: K, value: V) {
    return await this.drizzle.query.firewallAddressListSchema.findFirst({
      where: (fields, { eq }) => eq(fields[key as string], value),
      with: {
        address: true,
        ipCategory: true,
      },
    });
  }

  public async findByIpOnlyActive(ip: string) {
    return await this.drizzle.query.mikrotikUserIpsSchema.findFirst({
      where: (fields, { eq, and }) =>
        and(eq(fields.ip, ip), eq(fields.status, true)),
    });
  }

  public async findByIpWithAddressListAndUser(ip: string) {
    return await this.drizzle.query.mikrotikUserIpsSchema.findFirst({
      where: (fields, { eq, and }) =>
        and(eq(fields.ip, ip), eq(fields.status, true)),
      with: {
        addressList: true,
        user: true,
      },
    });
  }

  public async update(
    id: number,
    data: Partial<FirewallAddressListSchemaInsertType>,
  ) {
    const updated = await this.drizzle
      .update(firewallAddressListSchema)
      .set(data)
      .where(eq(firewallAddressListSchema.id, id));
    return updated[0].affectedRows > 0;
  }
}
