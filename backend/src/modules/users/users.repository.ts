import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DRIZZLE_PROVIDER } from "src/lib/constants";
import {
  UsersSchemaInsertType,
  UsersSchemaType,
  userDetailsSchema,
  usersSchema,
} from "src/shared/drizzle/schemas";
import { Drizzle } from "src/types/drizzle.types";

@Injectable()
export class UsersRepository {
  constructor(@Inject(DRIZZLE_PROVIDER) private readonly drizzle: Drizzle) {}

  public async createUserWithDetails(data: UsersSchemaInsertType) {
    const [{ insertId }] = await this.drizzle.insert(usersSchema).values(data);
    await this.drizzle.insert(userDetailsSchema).values({ userId: insertId });
    return insertId;
  }

  public async findUserByKey<K extends keyof UsersSchemaType>(
    keyName: K,
    value: UsersSchemaType[K],
  ) {
    const user = await this.drizzle
      .select()
      .from(usersSchema)
      .where(eq(usersSchema[keyName], value));
    if (!user.length) throw new NotFoundException("User not found");
    return user;
  }

  public async findUserByKeyWithDetail<K extends keyof UsersSchemaType>(
    keyName: K,
    value: UsersSchemaType[K],
  ) {
    const user = await this.drizzle
      .select()
      .from(usersSchema)
      .where(eq(usersSchema[keyName], value))
      .innerJoin(
        userDetailsSchema,
        eq(usersSchema.id, userDetailsSchema.userId),
      );
    if (!user.length) throw new NotFoundException("User not found");
    return user;
  }
}
