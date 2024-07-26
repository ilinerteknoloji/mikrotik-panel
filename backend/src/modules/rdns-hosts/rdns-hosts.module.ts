import { Module } from "@nestjs/common";
import { RdnsHostsService } from "./rdns-hosts.service";
import { RdnsHostsController } from "./rdns-hosts.controller";
import { RdnsHostsRepository } from "./rdns-hosts.repository";

@Module({
  controllers: [RdnsHostsController],
  providers: [RdnsHostsService, RdnsHostsRepository],
})
export class RdnsHostsModule {}
