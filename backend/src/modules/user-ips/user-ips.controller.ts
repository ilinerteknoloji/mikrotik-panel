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

@Controller("user-ips")
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class UserIpsController {
  constructor(private readonly userIpsService: UserIpsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createIpDto: CreateUserIpDto) {
    return this.userIpsService.create(createIpDto);
  }

  @Get()
  findAll(
    @Query("page", PagePipe) page: number,
    @Query("limit", LimitPipe) limit: number,
    @Query("search") search: string = "",
  ) {
    return this.userIpsService.findAll(page, limit, search);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.userIpsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateIpDto: UpdateUserIpDto,
  ) {
    return this.userIpsService.update(id, updateIpDto);
  }

  // @Delete(":id")
  // remove(@Param("id", ParseIntPipe) id: number) {
  //   return this.ipsService.remove(id);
  // }
}
