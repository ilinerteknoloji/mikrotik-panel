import { Module } from "@nestjs/common";
import { InterfaceController } from "./interface.controller";
import { InterfaceRepository } from "./interface.repository";
import { InterfaceService } from "./interface.service";
import { IpTunnelModule } from "./modules/ip-tunnel/ip-tunnel.module";
import { BridgeModule } from "./modules/bridge/bridge.module";

@Module({
  imports: [BridgeModule, IpTunnelModule],
  controllers: [InterfaceController],
  providers: [InterfaceService, InterfaceRepository],
  exports: [InterfaceRepository],
})
export class InterfaceModule {}
