import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { eq, like, or, sql } from "drizzle-orm";
import { DRIZZLE_PROVIDER } from "src/lib/constants";
import { UserRole } from "src/lib/enums/user-role.enum";
import {
  UsersSchemaInsertType,
  UsersSchemaType,
  userDetailsSchema,
  usersSchema,
} from "src/shared/drizzle/schemas";
import { OrderByPipeType } from "src/types";
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
    orderBy: OrderByPipeType<UsersSchemaType>,
  ) {
    const offset = (page - 1) * limit;
    const conditions = [];
    if (search.length > 0)
      conditions.push(
        or(
          like(usersSchema.id, `%${search}%`),
          like(usersSchema.firstName, `%${search}%`),
          like(usersSchema.lastName, `%${search}%`),
          like(usersSchema.username, `%${search}%`),
          like(usersSchema.email, `%${search}%`),
          like(usersSchema.phoneNumber, `%${search}%`),
        ),
      );
    if (role !== undefined) conditions.push(eq(usersSchema.role, role));
    if (status !== undefined) conditions.push(eq(usersSchema.status, status));
    return await this.drizzle.query.usersSchema.findMany({
      columns: { password: false },
      where: (fields, { and }) => and(...conditions),
      limit,
      offset,
      orderBy(fields, operators) {
        return operators[orderBy.order](fields[orderBy.key]);
      },
    });
  }

  public async allUsersCount() {
    const query = sql`
    SELECT 
      COUNT(*) AS total_count, 
      SUM(role = 'admin') AS admin_count, 
      SUM(status = TRUE AND role = 'admin') AS active_admin, 
      SUM(status = FALSE AND role = 'admin') AS passive_admin, 
      SUM(role = 'user') AS user_count, 
      SUM(status = TRUE AND role = 'user') AS active_user, 
      SUM(status = FALSE AND role = 'user') AS passive_user 
    FROM users;
  `;
    const response = await this.drizzle.execute(query);
    console.log(response[0]);

    return response[0];
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

  public async findUserWithUniqueValues(value: string) {
    const user = await this.drizzle
      .select()
      .from(usersSchema)
      .where(
        or(
          eq(usersSchema.username, value),
          eq(usersSchema.email, value),
          eq(usersSchema.phoneNumber, value),
        ),
      )
      .innerJoin(
        userDetailsSchema,
        eq(usersSchema.id, userDetailsSchema.userId),
      );
    if (!user.length) throw new NotFoundException("User not found");
    return user;
  }
}
