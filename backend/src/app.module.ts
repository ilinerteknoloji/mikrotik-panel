import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { InterfaceModule } from "./modules/mikrotik/interface/interface.module";
import { AddressListsModule } from "./modules/mikrotik/ip/firewall/address-lists/address-lists.module";
import { IpCategoriesModule } from "./modules/mikrotik/ip/firewall/ip-categories/ip-categories.module";
import { TorchModule } from "./modules/mikrotik/tool/torch/torch.module";
import { UserIpsModule } from "./modules/user-ips/user-ips.module";
import { UsersModule } from "./modules/users/users.module";
import { DrizzleModule } from "./shared/drizzle/drizzle.module";
import { EncryptionModule } from "./shared/encryption/encryption.module";
import { EnvModule } from "./shared/env/env.module";
import { envSchema } from "./shared/env/env.schema";
import { JwtModule } from "./shared/jwt/jwt.module";
import { GenerateKeysModule } from "./shared/keys/generate-keys.module";
import { LifecycleModule } from "./shared/lifecycle/lifecycle.module";
import { BridgeModule } from "./modules/mikrotik/interface/modules/bridge/bridge.module";

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
    AddressListsModule,
    TorchModule,
    InterfaceModule,
    BridgeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
