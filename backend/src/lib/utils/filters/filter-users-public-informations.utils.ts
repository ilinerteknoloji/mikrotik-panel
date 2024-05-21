import { UsersSchemaType } from "src/shared/drizzle/schemas";

export function filterUsersPublicInformations(user: UsersSchemaType) {
  const { password: _password, status: _status, ...publicInformations } = user;
  return publicInformations;
}
