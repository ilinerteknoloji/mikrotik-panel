import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DRIZZLE_PROVIDER } from "src/lib/constants";
import { drizzleProvider } from "./drizzle.provider";
import { EnvModule } from "src/shared/env/env.module";

@Module({
  imports: [ConfigModule, EnvModule],
  providers: [drizzleProvider],
  exports: [DRIZZLE_PROVIDER],
})
export class DrizzleModule {}
