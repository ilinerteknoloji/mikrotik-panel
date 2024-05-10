import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { envConfig } from "./shared/config";

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
