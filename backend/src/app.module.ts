import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EncryptionModule } from "./shared/encryption/encryption.module";
import { EnvModule } from "./shared/env/env.module";
import { envSchema } from "./shared/env/env.schema";
import { JwtModule } from "./shared/jwt/jwt.module";
import { GenerateKeysModule } from "./shared/keys/generate-keys.module";
import { LifecycleModule } from "./shared/lifecycle/lifecycle.module";
import { DrizzleModule } from "./shared/drizzle/drizzle.module";
import { AuthModule } from "./modules/auth/auth.module";

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
