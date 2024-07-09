import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { UseRoles } from "src/lib/decorators/roles.decorator";
import { UserRole } from "src/lib/enums/user-role.enum";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { CreateIpTunnelDto } from "./dto/create-ip-tunnel.dto";
import { IpTunnelService } from "./ip-tunnel.service";

@Controller("interface/ip-tunnel")
@UseGuards(AuthGuard, RolesGuard)
@UseRoles(UserRole.ADMIN)
export class IpTunnelController {
  constructor(private readonly ipTunnelService: IpTunnelService) {}

  @Post()
  public create(@Body() createIpTunnelDto: CreateIpTunnelDto) {
    return this.ipTunnelService.create(createIpTunnelDto);
  }

  // @Get()
  // public findAll() {
  //   return this.ipTunnelService.findAll();
  // }

  // @Get(":id")
  // public findOne(@Param("id") id: string) {
  //   return this.ipTunnelService.findOne(+id);
  // }

  // @Patch(":id")
  // public update(
  //   @Param("id") id: string,
  //   @Body() updateIpTunnelDto: UpdateIpTunnelDto,
  // ) {
  //   return this.ipTunnelService.update(+id, updateIpTunnelDto);
  // }

  // @Delete(":id")
  // public remove(@Param("id") id: string) {
  //   return this.ipTunnelService.remove(+id);
  // }
}
