import {Inject, Injectable} from "@nestjs/common";
import {eq, like} from "drizzle-orm";
import {DRIZZLE_PROVIDER} from "src/lib/constants";
import {rdnsHostsSchema, RdnsHostsSchemaType} from "src/shared/drizzle/schemas";
import {Drizzle, OrderByPipeType} from "src/types";
import {CreateRdnsHostDto} from "./dto/create-rdns-host.dto";
import {UpdateRdnsHostDto} from "./dto/update-rdns-host.dto";

@Injectable()
export class RdnsHostsRepository {
  constructor(@Inject(DRIZZLE_PROVIDER) private readonly drizzle: Drizzle) {}

  public async create(createRdnsHostDto: CreateRdnsHostDto) {
    const {host, hostnameMain} = createRdnsHostDto;
    const response = await this.drizzle
      .insert(rdnsHostsSchema)
      .values({hostname: host, hostnameMain});
    return this.findOne(response[0].insertId);
  }

  public async findAll(
    page: number,
    limit: number,
    search: string,
    status: boolean | undefined,
    orderBy: OrderByPipeType<RdnsHostsSchemaType>,
  ) {
    const offset = (page - 1) * limit;
    const conditions = [];
    if (search.length > 0)
      conditions.push(like(rdnsHostsSchema.hostname, `%${search}%`));
    if (status !== undefined)
      conditions.push(eq(rdnsHostsSchema.status, status));
    return this.drizzle.query.rdnsHostsSchema.findMany({
      where: (fields, {and}) => and(...conditions),
      limit,
      offset,
      orderBy(fields, operators) {
        return operators[orderBy.order](fields[orderBy.key]);
      },
    });
  }

  public async findOne(id: number) {
    return this.drizzle
      .select()
      .from(rdnsHostsSchema)
      .where(eq(rdnsHostsSchema.id, id));
  }

  public async update(id: number, updateRdnsHostDto: UpdateRdnsHostDto) {
    await this.drizzle
      .update(rdnsHostsSchema)
      .set({
        hostname: updateRdnsHostDto.host,
        hostnameMain: updateRdnsHostDto.hostnameMain,
        status: updateRdnsHostDto.status,
      })
      .where(eq(rdnsHostsSchema.id, id));

    return this.findOne(id);
  }
}
