import { Module } from "@nestjs/common";
import { LifecycleService } from "./lifecycle.service";
import { GenerateKeysModule } from "../keys/generate-keys.module";

@Module({
  imports: [GenerateKeysModule],
  providers: [LifecycleService],
})
export class LifecycleModule {}
