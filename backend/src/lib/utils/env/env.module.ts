import { Module } from "@nestjs/common";
import { EnvService } from "./env.service";
import { GenerateKeysModule } from "../keys/generate-keys.module";

@Module({
  imports: [GenerateKeysModule],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
