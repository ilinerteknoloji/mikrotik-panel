import { Module } from "@nestjs/common";
import { UserIpsService } from "./user-ips.service";
import { UserIpsController } from "./user-ips.controller";
import { UserIpsRepository } from "./user-ips.repository";
import { DrizzleModule } from "src/shared/drizzle/drizzle.module";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "src/shared/jwt/jwt.module";

@Module({
  imports: [JwtModule, UsersModule, DrizzleModule],
  controllers: [UserIpsController],
  providers: [UserIpsService, UserIpsRepository],
})
export class UserIpsModule {}
