import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, catchError, map } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res: unknown) => this.responseInterceptor(res, context)),
      catchError((error: HttpException) =>
        this.errorInterceptor(error, context),
      ),
    );
  }

  responseInterceptor(data: unknown, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    return {
      status: true,
      statusCode: response.statusCode,
      path: request.url,
      data,
    };
  }

  errorInterceptor(
    error: HttpException | Error,
    context: ExecutionContext,
  ): Observable<never> {
    const ctx = context.switchToHttp();
    // const response = ctx.getResponse();
    const request = ctx.getRequest();

    const myError =
      error instanceof HttpException
        ? error
        : new InternalServerErrorException(error.message);

    throw new HttpException(
      {
        status: false,
        statusCode: myError.getStatus(),
        path: request.url,
        error: myError.message,
        data: myError.getResponse(),
      },
      myError.getStatus(),
    );
  }
}
