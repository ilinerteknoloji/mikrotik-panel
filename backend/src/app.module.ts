import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envConfig } from "./lib/config";
import { DrizzleModule } from "./modules/drizzle/drizzle.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
    }),
    DrizzleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
