import {Module} from "@nestjs/common";
import {RdnsHostsController} from "./rdns-hosts.controller";
import {RdnsHostsRepository} from "./rdns-hosts.repository";
import {RdnsHostsService} from "./rdns-hosts.service";

@Module({
  controllers: [RdnsHostsController],
  providers: [RdnsHostsService, RdnsHostsRepository],
})
export class RdnsHostsModule {}
