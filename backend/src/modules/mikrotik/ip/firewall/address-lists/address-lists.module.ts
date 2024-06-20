import { Module } from "@nestjs/common";
import { EnvModule } from "src/shared/env/env.module";
import { IpCategoriesModule } from "../ip-categories/ip-categories.module";
import { AddressListsController } from "./address-lists.controller";
import { AddressListsRepository } from "./address-lists.repository";
import { AddressListsService } from "./address-lists.service";

@Module({
  imports: [EnvModule, IpCategoriesModule],
  controllers: [AddressListsController],
  providers: [AddressListsService, AddressListsRepository],
  exports: [AddressListsService, AddressListsRepository],
})
export class AddressListsModule {}
