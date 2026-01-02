import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { CreateTorchDto } from "./dto/create-torch.dto";
import { TorchService } from "./torch.service";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { UserRole } from "src/lib/enums/user-role.enum";
import { UseRoles } from "src/lib/decorators/roles.decorator";

@Controller("torch")
@UseGuards(AuthGuard, RolesGuard)
@UseRoles(UserRole.ADMIN)
export class TorchController {
  constructor(private readonly torchService: TorchService) {}

  @Post()
  @UseRoles(UserRole.ADMIN, UserRole.USER)
  public create(@Body() createTorchDto: CreateTorchDto) {
    return this.torchService.create(createTorchDto);
  }

  // @Get()
  // public findAll() {
  //   return this.torchService.findAll();
  // }

  // @Get(":id")
  // public findOne(@Param("id") id: string) {
  //   return this.torchService.findOne(+id);
  // }

  // @Patch(":id")
  // public update(@Param("id") id: string, @Body() updateTorchDto: UpdateTorchDto) {
  //   return this.torchService.update(+id, updateTorchDto);
  // }

  // @Delete(":id")
  // public remove(@Param("id") id: string) {
  //   return this.torchService.remove(+id);
  // }
}
