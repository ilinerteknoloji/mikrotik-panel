import {
  ArgumentMetadata,
  Injectable,
  Paramtype,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class LimitPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const paramTypeAccess: Record<Paramtype, boolean> = {
      query: true,
      param: true,
      body: false,
      custom: false,
    };
    if (!paramTypeAccess[metadata.type]) return 10;
    if (!value) return 10;
    const limit = parseInt(value, 10);
    if (isNaN(limit) || limit < 1) return 10;
    if (limit > 50) return 50;
    return limit;
  }
}
