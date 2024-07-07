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
import { RequestUserType } from "src/types";

@Controller("users")
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard)
  @UseRoles(UserRole.ADMIN)
  public findAll(
    @Query("page", PagePipe) page: number,
    @Query("limit", LimitPipe) limit: number,
    @Query("search") search: string = "",
    @Query("role", RolePipe) role: UserRole | undefined,
    @Query("status", StatusPipe) status: boolean | undefined,
  ) {
    return this.usersService.findAll(page, limit, search, role, status);
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
