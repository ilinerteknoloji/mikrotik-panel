import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from "@nestjs/common";

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
    response.status(myError.getStatus()).json({
      status: false,
      statusCode: myError.getStatus(),
      path: request.url,
      error: myError.message,
      response: myError.getResponse(),
    });
  }
}
