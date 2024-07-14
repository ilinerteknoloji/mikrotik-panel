import {
  ArgumentMetadata,
  Injectable,
  Paramtype,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class StatusPipe implements PipeTransform<string, boolean> {
  transform(value: string, metadata: ArgumentMetadata): boolean | undefined {
    const paramTypeAccess: Record<Paramtype, boolean> = {
      query: true,
      param: false,
      body: false,
      custom: false,
    };
    if (!paramTypeAccess[metadata.type] || value === undefined)
      return undefined;
    return !!value ? true : false;
  }
}
