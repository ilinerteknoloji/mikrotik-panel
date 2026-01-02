import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from "@nestjs/common";
import {logger} from "src/shared/logger";

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const myError =
      exception instanceof HttpException
        ? exception
        : new InternalServerErrorException(exception.message);
    const {method, url, headers, ip} = request;
    logger.error({method, url, headers, ip, error: JSON.stringify(myError)});
    response.status(myError.getStatus()).json({
      status: false,
      statusCode: myError.getStatus(),
      path: request.url,
      error: myError.message,
      response: myError.getResponse(),
    });
  }
}
