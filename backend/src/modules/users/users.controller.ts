import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { UseRoles } from "src/lib/decorators/roles.decorator";
import { UserRole } from "src/lib/enums/user-role.enum";
import { AuthGuard } from "../auth/guards/auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
import { PagePipe } from "src/lib/pipes/page.pipe";
import { LimitPipe } from "src/lib/pipes/limit.pipe";
import { RolePipe } from "src/lib/pipes/role.pipe";
import { StatusPipe } from "src/lib/pipes/status.pipe";
import { User } from "src/lib/decorators/user.decorator";
import { OrderByPipeType, RequestUserType } from "src/types";
import { OrderByPipe } from "src/lib/pipes/order-by.pipe";
import { usersSchema, UsersSchemaType } from "src/shared/drizzle/schemas";

@Controller("users")
@UseGuards(AuthGuard, RolesGuard)
@UseRoles(UserRole.ADMIN, UserRole.USER)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseRoles(UserRole.ADMIN)
  public findAll(
    @Query("page", PagePipe) page: number,
    @Query("limit", LimitPipe) limit: number,
    @Query("search") search: string = "",
    @Query("role", RolePipe) role: UserRole | undefined,
    @Query("status", StatusPipe) status: boolean | undefined,
    @Query(
      "order-by",
      new OrderByPipe<UsersSchemaType>(
        { key: "id", order: "asc" },
        usersSchema,
      ),
    )
    orderBy: OrderByPipeType<UsersSchemaType>,
  ) {
    return this.usersService.findAll(
      page,
      limit,
      search,
      role,
      status,
      orderBy,
    );
  }

  @Get("count")
  @UseRoles(UserRole.ADMIN)
  public allUsersCount() {
    return this.usersService.allUsersCount();
  }

  @Get("usernames")
  @UseRoles(UserRole.ADMIN)
  public findAllUsername() {
    return this.usersService.findAllUsername();
  }

  @Get(":identifier")
  public findById(
    @Param("identifier") identifier: string,
    @User() user: RequestUserType,
  ) {
    if (
      !isNaN(+identifier) &&
      (user.id === +identifier || user.role === UserRole.ADMIN)
    ) {
      return this.usersService.findById(+identifier);
    } else if (user.username === identifier || user.role === UserRole.ADMIN) {
      return this.usersService.findByUsername(identifier);
    }
    throw new UnauthorizedException(
      "You don't have permission to access this resource",
    );
  }

  // @Get(":username")
  // public findByUsername(@Param("username") username: string) {
  //   return this.usersService.findByUsername(username);
  // }

  @Patch(":id")
  public update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  public remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
