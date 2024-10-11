import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { BridgeService } from "./bridge.service";
import { CreateBridgeDto } from "./dto/create-bridge.dto";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { UseRoles } from "src/lib/decorators/roles.decorator";
import { UserRole } from "src/lib/enums/user-role.enum";
import { UpdateBridgeDto } from "./dto/update-bridge.dto";

@Controller("interface/bridge")
@UseGuards(AuthGuard, RolesGuard)
@UseRoles(UserRole.ADMIN)
export class BridgeController {
  constructor(private readonly bridgeService: BridgeService) {}

  @Post()
  public create(@Body() createBridgeDto: CreateBridgeDto) {
    return this.bridgeService.create(createBridgeDto);
  }

  @Patch(":id")
  public update(
    @Param("id") id: string,
    @Body() updateInterfaceDto: UpdateBridgeDto,
  ) {
    if (!id.startsWith("*")) id = `*${id}`;
    return this.bridgeService.update(id, updateInterfaceDto);
  }
}
