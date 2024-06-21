import { Module } from "@nestjs/common";
import { InterfaceController } from "./interface.controller";
import { InterfaceRepository } from "./interface.repository";
import { InterfaceService } from "./interface.service";

@Module({
  controllers: [InterfaceController],
  providers: [InterfaceService, InterfaceRepository],
  exports: [InterfaceRepository],
})
export class InterfaceModule {}
