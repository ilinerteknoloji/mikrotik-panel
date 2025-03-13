import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {UseRoles} from "src/lib/decorators/roles.decorator";
import {UserRole} from "src/lib/enums/user-role.enum";
import {LimitPipe, PagePipe, StatusPipe} from "src/lib/pipes";
import {OrderByPipe} from "src/lib/pipes/order-by.pipe";
import {rdnsHostsSchema, RdnsHostsSchemaType} from "src/shared/drizzle/schemas";
import {OrderByPipeType} from "src/types";
import {AuthGuard} from "../auth/guards/auth.guard";
import {RolesGuard} from "../auth/guards/roles.guard";
import {CreateRdnsHostDto} from "./dto/create-rdns-host.dto";
import {UpdateRdnsHostDto} from "./dto/update-rdns-host.dto";
import {RdnsHostsService} from "./rdns-hosts.service";

@Controller("rdns-hosts")
@UseGuards(AuthGuard, RolesGuard)
@UseRoles(UserRole.ADMIN)
export class RdnsHostsController {
  constructor(private readonly rdnsHostsService: RdnsHostsService) {}

  @Post()
  create(@Body() createRdnsHostDto: CreateRdnsHostDto) {
    return this.rdnsHostsService.create(createRdnsHostDto);
  }

  @Get()
  @UseRoles(UserRole.ADMIN, UserRole.USER)
  findAll(
    @Query("page", PagePipe) page: number,
    @Query("limit", LimitPipe) limit: number,
    @Query("search") search: string = "",
    @Query("status", StatusPipe) status: boolean | undefined,
    @Query(
      "order-by",
      new OrderByPipe<RdnsHostsSchemaType>(
        {key: "id", order: "asc"},
        rdnsHostsSchema,
      ),
    )
    orderBy: OrderByPipeType<RdnsHostsSchemaType>,
  ) {
    return this.rdnsHostsService.findAll(page, limit, search, status, orderBy);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.rdnsHostsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRdnsHostDto: UpdateRdnsHostDto,
  ) {
    return this.rdnsHostsService.update(+id, updateRdnsHostDto);
  }
}
