import { Global, Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DRIZZLE_PROVIDER } from "src/lib/constants";
import {
  MikrotikUserIpsSchemaType,
  mikrotikUserIpsSchema,
} from "src/shared/drizzle/schemas";
import { Drizzle, OrderByPipeType } from "src/types";
import { UpdateUserIpDto } from "./dto/update-user-ip.dto";

@Global()
@Injectable()
export class UserIpsRepository {
  constructor(@Inject(DRIZZLE_PROVIDER) private readonly drizzle: Drizzle) {}

  public async create(ip: string, userId: number) {
    const insert = await this.drizzle
      .insert(mikrotikUserIpsSchema)
      .values({ ip, userId });
    return insert[0].insertId > 0 ? ip : undefined;
  }

  public async findByKeyOnlyActiveWithUser<
    K extends keyof MikrotikUserIpsSchemaType,
    V extends MikrotikUserIpsSchemaType[K],
  >(key: K, values: V) {
    return await this.drizzle.query.mikrotikUserIpsSchema.findFirst({
      where(fields, { eq, and }) {
        return and(eq(fields[key], values as any), eq(fields.status, true));
      },
      with: {
        user: true,
      },
    });
  }

  public async findAllByUserId(
    page: number,
    limit: number,
    status: boolean,
    search: string,
    orderBy: OrderByPipeType<MikrotikUserIpsSchemaType>,
    userId: number,
  ) {
    const offset = (page - 1) * limit;
    return await this.drizzle.query.mikrotikUserIpsSchema.findMany({
      columns: { userId: false },
      where(fields, { like, and, eq }) {
        return and(
          like(fields.ip, `%${search}%`),
          eq(fields.status, status),
          eq(fields.userId, userId),
        );
      },
      limit,
      offset,
      with: {
        addressList: {
          columns: { id: false, list: false, address: false },
          with: {
            address: { columns: { userId: false, ip: false } },
            ipCategory: true,
          },
        },
      },
      orderBy(fields, operators) {
        return operators[orderBy.order](fields[orderBy.key]);
      },
    });
  }

  public async findAll(
    page: number,
    limit: number,
    status: boolean,
    search: string,
    orderBy: OrderByPipeType<MikrotikUserIpsSchemaType>,
  ) {
    const offset = (page - 1) * limit;
    return await this.drizzle.query.mikrotikUserIpsSchema.findMany({
      columns: { userId: false },
      where(fields, { like, and, eq, or }) {
        return and(
          like(fields.ip, `%${search}%`),
          or(eq(fields.status, true), eq(fields.status, status)),
        );
      },
      limit,
      offset,
      with: {
        user: { columns: { password: false } },
        addressList: {
          columns: { id: false, list: false, address: false },
          with: {
            address: { columns: { userId: false, ip: false } },
            ipCategory: true,
          },
        },
      },
      orderBy(fields, operators) {
        return operators[orderBy.order](fields[orderBy.key]);
      },
    });
  }

  public async findOneById(id: number) {
    const ip = await this.drizzle.query.mikrotikUserIpsSchema.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, id);
      },
    });
    return ip;
  }

  public async update(id: number, updateUserIpDto: UpdateUserIpDto) {
    const update = await this.drizzle
      .update(mikrotikUserIpsSchema)
      .set(updateUserIpDto)
      .where(eq(mikrotikUserIpsSchema.id, id));
    return update[0].affectedRows > 0 ? await this.findOneById(id) : undefined;
  }
}
