import { Module } from "@nestjs/common";
import { BgpTemplatesService } from "./bgp-templates.service";
import { BgpTemplatesController } from "./bgp-templates.controller";
import { BgpTemplatesRepository } from "./bgp-templates.repository";

@Module({
  controllers: [BgpTemplatesController],
  providers: [BgpTemplatesService, BgpTemplatesRepository],
})
export class BgpTemplatesModule {}
