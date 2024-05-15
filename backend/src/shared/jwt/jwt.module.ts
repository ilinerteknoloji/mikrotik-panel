import { Module } from "@nestjs/common";
import { EnvModule } from "../env/env.module";
import { GenerateKeysModule } from "../keys/generate-keys.module";
import { JwtService } from "./jwt.service";
import { JwtRepository } from "./jwt.repository";
import { DrizzleModule } from "../drizzle/drizzle.module";

@Module({
  imports: [EnvModule, GenerateKeysModule, DrizzleModule],
  providers: [JwtService, JwtRepository],
  exports: [JwtService, JwtRepository],
})
export class JwtModule {}
