import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DRIZZLE_PROVIDER } from "src/lib/constants";
import { drizzleProvider } from "./drizzle.provider";

@Global()
@Module({
  imports: [ConfigModule],
  providers: [drizzleProvider],
  exports: [DRIZZLE_PROVIDER],
})
export class DrizzleModule {}
