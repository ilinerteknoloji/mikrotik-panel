import { UsersSchemaType } from "src/shared/drizzle/schemas";

export function filterUsersPublicInformations(user: UsersSchemaType) {
  const {
    password: _password,
    role: _role,
    status: _status,
    ...publicInformations
  } = user;
  return publicInformations;
}
