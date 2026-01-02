import { Module } from "@nestjs/common";
import { ArpService } from "./arp.service";
import { ArpController } from "./arp.controller";
import { ArpRepository } from "./arp.repository";

@Module({
  controllers: [ArpController],
  providers: [ArpService, ArpRepository],
})
export class ArpModule {}
