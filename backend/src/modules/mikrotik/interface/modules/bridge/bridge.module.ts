import { Module } from "@nestjs/common";
import { BridgeController } from "./bridge.controller";
import { BridgeRepository } from "./bridge.repository";
import { BridgeService } from "./bridge.service";

@Module({
  imports: [],
  controllers: [BridgeController],
  providers: [BridgeService, BridgeRepository],
  exports: [],
})
export class BridgeModule {}
// https://wiki.mikrotik.com/wiki/Manual:Interface/Bridge
