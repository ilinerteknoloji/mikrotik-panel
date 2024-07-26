import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UseRoles } from "src/lib/decorators/roles.decorator";
import { UserRole } from "src/lib/enums/user-role.enum";
import { AuthGuard } from "../auth/guards/auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { CreateRdnsHostDto } from "./dto/create-rdns-host.dto";
import { UpdateRdnsHostDto } from "./dto/update-rdns-host.dto";
import { RdnsHostsService } from "./rdns-hosts.service";

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
  findAll() {
    return this.rdnsHostsService.findAll();
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
