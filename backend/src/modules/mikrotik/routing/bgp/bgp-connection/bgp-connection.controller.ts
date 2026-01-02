import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {BgpConnectionService} from "./bgp-connection.service";
import {CreateBgpConnectionDto} from "./dto/create-bgp-connection.dto";
import {UpdateBgpConnectionDto} from "./dto/update-bgp-connection.dto";
import {RolesGuard} from "src/modules/auth/guards/roles.guard";
import {AuthGuard} from "src/modules/auth/guards/auth.guard";
import {UseRoles} from "src/lib/decorators/roles.decorator";
import {UserRole} from "src/lib/enums/user-role.enum";

@Controller("routing/bgp/connection")
@UseGuards(AuthGuard, RolesGuard)
@UseRoles(UserRole.ADMIN)
export class BgpConnectionController {
  constructor(private readonly bgpConnectionService: BgpConnectionService) {}

  @Post()
  create(@Body() createBgpConnectionDto: CreateBgpConnectionDto) {
    return this.bgpConnectionService.create(createBgpConnectionDto);
  }

  @Get()
  findAll() {
    return this.bgpConnectionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    if (!id.startsWith("*")) id = `*${id}`;
    return this.bgpConnectionService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateBgpConnectionDto: UpdateBgpConnectionDto,
  ) {
    if (!id.startsWith("*")) id = `*${id}`;
    return this.bgpConnectionService.update(id, updateBgpConnectionDto);
  }
}
