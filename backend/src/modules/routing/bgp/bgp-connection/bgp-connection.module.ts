import { Module } from "@nestjs/common";
import { BgpConnectionService } from "./bgp-connection.service";
import { BgpConnectionController } from "./bgp-connection.controller";
import { BgpConnectionRepository } from "./bgp-connection.repository";

@Module({
  controllers: [BgpConnectionController],
  providers: [BgpConnectionService, BgpConnectionRepository],
})
export class BgpConnectionModule {}
