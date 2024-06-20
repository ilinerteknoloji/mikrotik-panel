import { Global, Module } from "@nestjs/common";
import { GenerateKeysModule } from "../keys/generate-keys.module";
import { JwtRepository } from "./jwt.repository";
import { JwtService } from "./jwt.service";

@Global()
@Module({
  imports: [GenerateKeysModule],
  providers: [JwtService, JwtRepository],
  exports: [JwtService, JwtRepository],
})
export class JwtModule {}
