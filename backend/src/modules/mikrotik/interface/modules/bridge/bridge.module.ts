import { Module } from "@nestjs/common";
import { BridgeController } from "./bridge.controller";
import { BridgeService } from "./bridge.service";
import { BridgeRepository } from "./bridge.repository";

@Module({
  imports: [],
  controllers: [BridgeController],
  providers: [BridgeService, BridgeRepository],
  exports: [BridgeService, BridgeRepository],
})
export class BridgeModule {}
