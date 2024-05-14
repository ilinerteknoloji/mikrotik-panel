import { ConflictException } from "@nestjs/common";

export function invalidCredentials(): never {
  throw new ConflictException("Invalid credentials");
}
