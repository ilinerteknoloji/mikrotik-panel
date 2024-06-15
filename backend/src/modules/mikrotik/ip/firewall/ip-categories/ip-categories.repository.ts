import { Inject, Injectable } from "@nestjs/common";
import { DRIZZLE_PROVIDER } from "src/lib/constants";
import { Drizzle } from "src/types";
import { CreateIpCategoryDto } from "./dto/create-ip-category.dto";
import {
  IpCategoriesSchemaType,
  ipCategoriesSchema,
} from "src/shared/drizzle/schemas";
import { eq } from "drizzle-orm";
import { UpdateIpCategoryDto } from "./dto/update-ip-category.dto";

@Injectable()
export class IpCategoriesRepository {
  constructor(@Inject(DRIZZLE_PROVIDER) private readonly drizzle: Drizzle) {}

  public async create(createIpCategoryDto: CreateIpCategoryDto) {
    return this.drizzle.insert(ipCategoriesSchema).values(createIpCategoryDto);
  }

  public async findByKey<
    K extends keyof IpCategoriesSchemaType,
    T extends IpCategoriesSchemaType[K],
  >(key: K, value: T) {
    return await this.drizzle.query.ipCategoriesSchema.findMany({
      where(fields, { eq, and }) {
        return and(eq(fields[key], value as any), eq(fields.status, true));
      },
    });
  }

  public async update(id: number, updateIpCategoryDto: UpdateIpCategoryDto) {
    const updated = await this.drizzle
      .update(ipCategoriesSchema)
      .set(updateIpCategoryDto)
      .where(eq(ipCategoriesSchema.id, id));
    return updated.length > 0 ? `${id} updated.` : `No record found for ${id}`;
  }
}
