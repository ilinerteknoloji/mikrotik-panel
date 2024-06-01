import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { UserIpsModule } from "./modules/user-ips/user-ips.module";
import { UsersModule } from "./modules/users/users.module";
import { DrizzleModule } from "./shared/drizzle/drizzle.module";
import { EncryptionModule } from "./shared/encryption/encryption.module";
import { EnvModule } from "./shared/env/env.module";
import { envSchema } from "./shared/env/env.schema";
import { JwtModule } from "./shared/jwt/jwt.module";
import { GenerateKeysModule } from "./shared/keys/generate-keys.module";
import { LifecycleModule } from "./shared/lifecycle/lifecycle.module";
import { IpCategoriesModule } from "./modules/ip-categories/ip-categories.module";

@Module({
  imports: [
    LifecycleModule,
    GenerateKeysModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    DrizzleModule,
    JwtModule,
    EncryptionModule,
    AuthModule,
    UsersModule,
    UserIpsModule,
    IpCategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
