import { Module } from "@nestjs/common";
import { AddressListsModule } from "../mikrotik/ip/firewall/address-lists/address-lists.module";
import { UserIpsController } from "./user-ips.controller";
import { UserIpsRepository } from "./user-ips.repository";
import { UserIpsService } from "./user-ips.service";

@Module({
  imports: [AddressListsModule],
  controllers: [UserIpsController],
  providers: [UserIpsService, UserIpsRepository],
  exports: [UserIpsRepository],
})
export class UserIpsModule {}
