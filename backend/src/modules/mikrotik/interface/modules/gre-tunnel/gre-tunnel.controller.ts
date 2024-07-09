import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateGreTunnelDto } from "./dto/create-gre-tunnel.dto";
import { GreTunnelService } from "./gre-tunnel.service";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { UseRoles } from "src/lib/decorators/roles.decorator";
import { UserRole } from "src/lib/enums/user-role.enum";

@Controller("interface/gre-tunnel")
@UseGuards(AuthGuard, RolesGuard)
@UseRoles(UserRole.ADMIN)
export class GreTunnelController {
  constructor(private readonly greTunnelService: GreTunnelService) {}

  @Post()
  public create(@Body() createGreTunnelDto: CreateGreTunnelDto) {
    return this.greTunnelService.create(createGreTunnelDto);
  }

  // @Get()
  // public findAll() {
  //   return this.greTunnelService.findAll();
  // }

  // @Get(":id")
  // public findOne(@Param("id") id: string) {
  //   return this.greTunnelService.findOne(+id);
  // }

  // @Patch(":id")
  // public update(
  //   @Param("id") id: string,
  //   @Body() updateGreTunnelDto: UpdateGreTunnelDto,
  // ) {
  //   return this.greTunnelService.update(+id, updateGreTunnelDto);
  // }

  // @Delete(":id")
  // public remove(@Param("id") id: string) {
  //   return this.greTunnelService.remove(+id);
  // }
}
