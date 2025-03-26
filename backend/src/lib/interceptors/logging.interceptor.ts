import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import {Observable, tap} from "rxjs";
import {logger} from "src/shared/logger";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const {method, url, headers, _body, ip} = request;

    logger.request({
      method,
      url,
      headers,
      // body,
      ip,
    });

    const now = Date.now();

    return next.handle().pipe(
      tap((responseData) => {
        const response = context.switchToHttp().getResponse();
        const {statusCode} = response;

        logger.response({
          statusCode,
          duration: `${Date.now() - now}ms`,
          responseBody: responseData,
        });
      }),
    );
  }
}
