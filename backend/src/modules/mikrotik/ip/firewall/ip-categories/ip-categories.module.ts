import { Module } from "@nestjs/common";
import { UsersModule } from "src/modules/users/users.module";
import { IpCategoriesController } from "./ip-categories.controller";
import { IpCategoriesRepository } from "./ip-categories.repository";
import { IpCategoriesService } from "./ip-categories.service";

@Module({
  imports: [UsersModule],
  controllers: [IpCategoriesController],
  providers: [IpCategoriesService, IpCategoriesRepository],
  exports: [IpCategoriesRepository],
})
export class IpCategoriesModule {}
