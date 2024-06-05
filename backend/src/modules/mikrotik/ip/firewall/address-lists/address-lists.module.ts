import { Module } from "@nestjs/common";
import { IpCategoriesModule } from "src/modules/ip-categories/ip-categories.module";
import { UserIpsModule } from "src/modules/user-ips/user-ips.module";
import { UsersModule } from "src/modules/users/users.module";
import { DrizzleModule } from "src/shared/drizzle/drizzle.module";
import { EnvModule } from "src/shared/env/env.module";
import { JwtModule } from "src/shared/jwt/jwt.module";
import { AddressListsController } from "./address-lists.controller";
import { AddressListsRepository } from "./address-lists.repository";
import { AddressListsService } from "./address-lists.service";

@Module({
  imports: [
    EnvModule,
    JwtModule,
    UsersModule,
    DrizzleModule,
    UserIpsModule,
    IpCategoriesModule,
  ],
  controllers: [AddressListsController],
  providers: [AddressListsService, AddressListsRepository],
})
export class AddressListsModule {}
