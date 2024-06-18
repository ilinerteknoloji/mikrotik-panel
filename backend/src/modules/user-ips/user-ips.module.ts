import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/shared/drizzle/drizzle.module";
import { JwtModule } from "src/shared/jwt/jwt.module";
import { AddressListsModule } from "../mikrotik/ip/firewall/address-lists/address-lists.module";
import { UsersModule } from "../users/users.module";
import { UserIpsController } from "./user-ips.controller";
import { UserIpsRepository } from "./user-ips.repository";
import { UserIpsService } from "./user-ips.service";

@Module({
  imports: [JwtModule, UsersModule, DrizzleModule, AddressListsModule],
  controllers: [UserIpsController],
  providers: [UserIpsService, UserIpsRepository],
  exports: [UserIpsRepository],
})
export class UserIpsModule {}
