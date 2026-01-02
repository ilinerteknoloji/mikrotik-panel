import { UsersSchemaType } from "src/shared/drizzle/schemas";

export function filterUsersPublicInformations(
  user: UsersSchemaType,
  isStatusInclude: boolean = false,
) {
  const { password: _password, status: _status, ...publicInformations } = user;
  return isStatusInclude
    ? { ...publicInformations, status: _status }
    : publicInformations;
}
