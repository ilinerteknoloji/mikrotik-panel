import { Inject, Injectable } from "@nestjs/common";
import { DRIZZLE_PROVIDER } from "src/lib/constants";
import { Drizzle } from "src/types";
import { CreateRdnsHostDto } from "./dto/create-rdns-host.dto";
import { rdnsHostsSchema } from "src/shared/drizzle/schemas";
import { eq } from "drizzle-orm";
import { UpdateRdnsHostDto } from "./dto/update-rdns-host.dto";

@Injectable()
export class RdnsHostsRepository {
  constructor(@Inject(DRIZZLE_PROVIDER) private readonly drizzle: Drizzle) {}

  public async create(createRdnsHostDto: CreateRdnsHostDto) {
    const response = await this.drizzle
      .insert(rdnsHostsSchema)
      .values({ hostname: createRdnsHostDto.host });
    return this.findOne(response[0].insertId);
  }

  public async findAll() {
    return this.drizzle.select().from(rdnsHostsSchema);
  }

  public async findOne(id: number) {
    return this.drizzle
      .select()
      .from(rdnsHostsSchema)
      .where(eq(rdnsHostsSchema.id, id));
  }

  public async update(id: number, updateRdnsHostDto: UpdateRdnsHostDto) {
    return this.drizzle
      .update(rdnsHostsSchema)
      .set({
        hostname: updateRdnsHostDto.host,
        status: updateRdnsHostDto.status,
      })
      .where(eq(rdnsHostsSchema.id, id));
  }
}
