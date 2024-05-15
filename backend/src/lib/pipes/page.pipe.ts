import {
  ArgumentMetadata,
  Injectable,
  Paramtype,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class PagePipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const paramTypeAccess: Record<Paramtype, boolean> = {
      query: true,
      param: true,
      body: false,
      custom: false,
    };
    if (!paramTypeAccess[metadata.type]) return 1;
    if (!value) return 1;
    const page = parseInt(value, 10);
    if (isNaN(page) || page < 1) return 1;
    return page;
  }
}
