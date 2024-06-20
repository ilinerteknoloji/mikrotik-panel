import { Module } from "@nestjs/common";
import { EncryptionModule } from "src/shared/encryption/encryption.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [EncryptionModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
