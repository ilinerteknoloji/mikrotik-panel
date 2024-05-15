import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DRIZZLE_PROVIDER } from "src/lib/constants";
import { UserRole } from "src/lib/enums/user-role.enum";
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

  public async findUsers(
    page: number,
    limit: number,
    search: string,
    role: UserRole | undefined,
    status: boolean | undefined,
  ) {
    const offset = (page - 1) * limit;
    // console.log(offset, limit, search, role, status);

    // const query = this.drizzle
    //   .select()
    //   .from(usersSchema)
    //   .limit(limit)
    //   .offset(offset);
    // if (search)
    //   query.where(
    //     or(
    //       ilike(usersSchema.id, `%${search}%`),
    //       ilike(usersSchema.firstName, `%${search}%`),
    //       ilike(usersSchema.lastName, `%${search}%`),
    //       ilike(usersSchema.username, `%${search}%`),
    //       ilike(usersSchema.email, `%${search}%`),
    //       ilike(usersSchema.phoneNumber, `%${search}%`),
    //     ),
    //   );
    // if (role) query.where(eq(usersSchema.role, role));

    const query = this.drizzle.query.usersSchema.findMany({
      where: (fields, { like, or, and }) =>
        and(
          search
            ? or(
                like(fields.id, `%${search}%`),
                like(fields.firstName, `%${search}%`),
                like(fields.lastName, `%${search}%`),
                like(fields.username, `%${search}%`),
                like(fields.email, `%${search}%`),
                like(fields.phoneNumber, `%${search}%`),
              )
            : null,
          role ? eq(fields.role, role) : null,
          status.toString() ? eq(fields.status, status) : null,
        ),
      limit,
      offset,
    });
    console.log((await query).length);
    console.log(query.toSQL());

    return query;
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
