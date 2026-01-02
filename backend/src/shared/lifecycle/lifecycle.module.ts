import { Module } from "@nestjs/common";
import { LifecycleService } from "./lifecycle.service";
import { GenerateKeysModule } from "../keys/generate-keys.module";
import { IpCategoriesModule } from "src/modules/mikrotik/ip/firewall/ip-categories/ip-categories.module";

@Module({
  imports: [GenerateKeysModule, IpCategoriesModule],
  providers: [LifecycleService],
})
export class LifecycleModule {}
