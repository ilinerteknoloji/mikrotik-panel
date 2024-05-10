import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DRIZZLE_PROVIDER } from "src/shared/constants";
import { drizzleProvider } from "src/shared/providers";

@Module({
  providers: [drizzleProvider],
  imports: [ConfigModule],
  exports: [DRIZZLE_PROVIDER],
})
export class DrizzleModule {}
