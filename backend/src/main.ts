import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { EnvService } from "./lib/utils/env/env.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(EnvService);
  app.enableShutdownHooks();
  await app.listen(config.get("PORT"));
}
bootstrap();
