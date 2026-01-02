import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { UseRoles } from "src/lib/decorators/roles.decorator";
import { UserRole } from "src/lib/enums/user-role.enum";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { InterfaceService } from "./interface.service";

@Controller("interface")
@UseGuards(AuthGuard)
@UseRoles(UserRole.ADMIN)
export class InterfaceController {
  constructor(private readonly interfaceService: InterfaceService) {}

  // @Post()
  // public create(@Body() createInterfaceDto: CreateInterfaceDto) {
  //   return this.interfaceService.create(createInterfaceDto);
  // }

  @Get()
  @UseRoles(UserRole.ADMIN, UserRole.USER)
  public findAll() {
    return this.interfaceService.findAll();
  }

  @Get(":id")
  @UseRoles(UserRole.ADMIN, UserRole.USER)
  public findOne(@Param("id") id: string) {
    return this.interfaceService.findOne(id);
  }

  // @Patch(":id")
  // public update(
  //   @Param("id") id: string,
  //   @Body() updateInterfaceDto: UpdateInterfaceDto,
  // ) {
  //   return this.interfaceService.update(+id, updateInterfaceDto);
  // }

  // @Delete(":id")
  // public remove(@Param("id") id: string) {
  //   return this.interfaceService.remove(+id);
  // }
}
