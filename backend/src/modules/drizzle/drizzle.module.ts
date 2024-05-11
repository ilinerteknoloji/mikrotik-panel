import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DRIZZLE_PROVIDER } from "src/lib/constants";
import { drizzleProvider } from "./drizzle.provider";

@Module({
  providers: [drizzleProvider],
  imports: [ConfigModule],
  exports: [DRIZZLE_PROVIDER],
})
export class DrizzleModule {}
