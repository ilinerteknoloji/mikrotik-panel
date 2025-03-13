import {ValidationPipe} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {ResponseInterceptor} from "./lib/interceptors/response.interceptor";
import {validationPipeOptions} from "./lib/options/validation-pipe.options";
import {EnvService} from "./shared/env/env.service";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(EnvService);
  app.enableCors();
  app.enableShutdownHooks();
  app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.use(cookieParser());
  await app.listen(config.get("PORT"));
}
bootstrap();
