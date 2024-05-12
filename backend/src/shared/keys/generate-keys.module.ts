import { Module } from "@nestjs/common";
import { GenerateKeysService } from "./generate-keys.service";

@Module({
  providers: [GenerateKeysService],
  exports: [GenerateKeysService],
})
export class GenerateKeysModule {}
