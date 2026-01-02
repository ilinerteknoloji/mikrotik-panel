import { Module } from "@nestjs/common";
import { EncryptionModule } from "src/shared/encryption/encryption.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [EncryptionModule, CacheModule.register()],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
