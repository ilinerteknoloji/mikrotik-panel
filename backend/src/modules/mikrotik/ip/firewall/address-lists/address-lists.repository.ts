import { Inject, Injectable } from "@nestjs/common";
import { DRIZZLE_PROVIDER } from "src/lib/constants";
import { firewallAddressListSchema } from "src/shared/drizzle/schemas";
import { Drizzle } from "src/types";

@Injectable()
export class AddressListsRepository {
  constructor(@Inject(DRIZZLE_PROVIDER) private readonly drizzle: Drizzle) {}

  async create(list: number, address: number) {
    return await this.drizzle
      .insert(firewallAddressListSchema)
      .values({ list, address });
  }
}
