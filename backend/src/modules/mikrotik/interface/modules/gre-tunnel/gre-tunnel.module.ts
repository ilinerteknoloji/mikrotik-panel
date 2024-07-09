import { Module } from "@nestjs/common";
import { GreTunnelService } from "./gre-tunnel.service";
import { GreTunnelController } from "./gre-tunnel.controller";
import { GreTunnelRepository } from "./gre-tunnel.repository";

@Module({
  imports: [],
  controllers: [GreTunnelController],
  providers: [GreTunnelService, GreTunnelRepository],
  exports: [],
})
export class GreTunnelModule {}
// https://wiki.mikrotik.com/wiki/Manual:Interface/Gre
