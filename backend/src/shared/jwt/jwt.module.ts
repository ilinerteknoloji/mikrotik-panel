import { Module } from "@nestjs/common";
import { JwtService } from "./jwt.service";
import { EnvModule } from "../env/env.module";
import { GenerateKeysModule } from "../keys/generate-keys.module";

@Module({
  imports: [EnvModule, GenerateKeysModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
