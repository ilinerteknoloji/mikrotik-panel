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
    if (!paramTypeAccess[metadata.type]) return undefined;
    if (value === "true" || value === "1" || value) return true;
    if (value === "false" || value === "0" || !value) return false;
    return undefined;
  }
}
