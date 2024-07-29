import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";
import { User } from "src/lib/decorators/user.decorator";
import { LimitPipe, PagePipe } from "src/lib/pipes";
import { RequestUserType } from "src/types";
import { AuthGuard } from "../auth/guards/auth.guard";
import { RdnsRecordsService } from "./rdns-records.service";
import { RolesGuard } from "../auth/guards/roles.guard";
import { UseRoles } from "src/lib/decorators/roles.decorator";
import { UserRole } from "src/lib/enums/user-role.enum";

@Controller("rdns-records")
@UseGuards(AuthGuard, RolesGuard)
@UseRoles(UserRole.ADMIN, UserRole.USER)
export class RdnsRecordsController {
  constructor(private readonly rdnsRecordsService: RdnsRecordsService) {}

  // @Post()
  // create(@Body() createRdnsRecordDto: CreateRdnsRecordDto) {
  //   return this.rdnsRecordsService.create(createRdnsRecordDto);
  // }

  @Get()
  findAll(
    @Query("page", PagePipe) page: number,
    @Query("limit", LimitPipe) limit: number,
    @Query("search") search: string = "",
    @User() user: RequestUserType,
  ) {
    return this.rdnsRecordsService.findAll(page, limit, search, user);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Query("domainName") domainName: string) {
    return this.rdnsRecordsService.findOne(id, domainName);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Query("domainName") domainName: string,
    @Query("host") host: string,
    @Query("record") record: string,
    @User() user: RequestUserType,
  ) {
    return this.rdnsRecordsService.update(id, domainName, host, record, user);
  }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.rdnsRecordsService.remove(+id);
  // }
}
