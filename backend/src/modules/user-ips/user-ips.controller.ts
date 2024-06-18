import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "src/lib/decorators/roles.decorator";
import { UserRole } from "src/lib/enums/user-role.enum";
import { LimitPipe, PagePipe } from "src/lib/pipes";
import { AuthGuard } from "../auth/guards/auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { CreateUserIpDto } from "./dto/create-user-ip.dto";
import { UpdateUserIpDto } from "./dto/update-user-ip.dto";
import { UserIpsService } from "./user-ips.service";
import { User } from "src/lib/decorators/user.decorator";
import { RequestUserType } from "src/types";

@Controller("user-ips")
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.USER)
export class UserIpsController {
  constructor(private readonly userIpsService: UserIpsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  public create(@Body() createIpDto: CreateUserIpDto) {
    return this.userIpsService.create(createIpDto);
  }

  @Get()
  public findAll(
    @Query("page", PagePipe) page: number,
    @Query("limit", LimitPipe) limit: number,
    @Query("search") search: string = "",
    @User() user: RequestUserType,
  ) {
    return this.userIpsService.findAll(page, limit, search, user);
  }

  @Get(":id")
  public findOne(@Param("id", ParseIntPipe) id: number) {
    return this.userIpsService.findOne(id);
  }

  @Patch(":id")
  public update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateIpDto: UpdateUserIpDto,
  ) {
    return this.userIpsService.update(id, updateIpDto);
  }

  // @Delete(":id")
  // public remove(@Param("id", ParseIntPipe) id: number) {
  //   return this.ipsService.remove(id);
  // }
}
