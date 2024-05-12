import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EncryptionModule } from "./lib/utils/encryption/encryption.module";
import { EnvModule } from "./lib/utils/env/env.module";
import { envSchema } from "./lib/utils/env/env.schema";
import { JwtModule } from "./lib/utils/jwt/jwt.module";
import { GenerateKeysModule } from "./lib/utils/keys/generate-keys.module";
import { LifecycleModule } from "./lib/utils/lifecycle/lifecycle.module";
import { DrizzleModule } from "./lib/utils/drizzle/drizzle.module";

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
