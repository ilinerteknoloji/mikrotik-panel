import { Module } from "@nestjs/common";
import { IpTunnelService } from "./ip-tunnel.service";
import { IpTunnelController } from "./ip-tunnel.controller";
import { IpTunnelRepository } from "./ip-tunnel.repository";

@Module({
  imports: [],
  controllers: [IpTunnelController],
  providers: [IpTunnelService, IpTunnelRepository],
  exports: [],
})
export class IpTunnelModule {}
// https://wiki.mikrotik.com/wiki/Manual:Interface/IPIP
