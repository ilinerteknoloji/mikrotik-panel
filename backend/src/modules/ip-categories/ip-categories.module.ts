import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/shared/drizzle/drizzle.module";
import { IpCategoriesController } from "./ip-categories.controller";
import { IpCategoriesRepository } from "./ip-categories.repository";
import { IpCategoriesService } from "./ip-categories.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "src/shared/jwt/jwt.module";

@Module({
  imports: [JwtModule, UsersModule, DrizzleModule],
  controllers: [IpCategoriesController],
  providers: [IpCategoriesService, IpCategoriesRepository],
  exports: [IpCategoriesRepository],
})
export class IpCategoriesModule {}
