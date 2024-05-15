import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/shared/drizzle/drizzle.module";
import { EncryptionModule } from "src/shared/encryption/encryption.module";
import { JwtModule } from "src/shared/jwt/jwt.module";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [EncryptionModule, UsersModule, JwtModule, DrizzleModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
