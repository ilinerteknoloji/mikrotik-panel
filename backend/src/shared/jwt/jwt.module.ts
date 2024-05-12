import { Module } from "@nestjs/common";
import { EnvModule } from "../env/env.module";
import { GenerateKeysModule } from "../keys/generate-keys.module";
import { JwtService } from "./jwt.service";

@Module({
  imports: [EnvModule, GenerateKeysModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
