import { Module } from "@nestjs/common";
import { TablesService } from "./tables.service";
import { TablesController } from "./tables.controller";
import { TablesRepository } from "./tables.repository";

@Module({
  controllers: [TablesController],
  providers: [TablesService, TablesRepository],
})
export class TablesModule {}
