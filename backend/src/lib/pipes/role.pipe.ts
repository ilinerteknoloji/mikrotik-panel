import {
  ArgumentMetadata,
  Injectable,
  Paramtype,
  PipeTransform,
} from "@nestjs/common";
import { UserRole } from "../enums/user-role.enum";

@Injectable()
export class RolePipe implements PipeTransform<string, UserRole> {
  transform(value: string, metadata: ArgumentMetadata): UserRole | undefined {
    const paramTypeAccess: Record<Paramtype, boolean> = {
      query: true,
      param: true,
      body: false,
      custom: false,
    };
    if (!paramTypeAccess[metadata.type]) return undefined;
    if (!value) return undefined;
    const role = value.toUpperCase() as UserRole;
    if (Object.values(UserRole).includes(UserRole[role])) return UserRole[role];
    return undefined;
  }
}
