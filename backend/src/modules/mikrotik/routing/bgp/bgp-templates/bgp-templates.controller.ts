import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UseRoles } from "src/lib/decorators/roles.decorator";
import { UserRole } from "src/lib/enums/user-role.enum";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { BgpTemplatesService } from "./bgp-templates.service";
import { CreateBgpTemplateDto } from "./dto/create-bgp-template.dto";

@Controller("routing/bgp/templates")
@UseGuards(AuthGuard, RolesGuard)
@UseRoles(UserRole.ADMIN)
export class BgpTemplatesController {
  constructor(private readonly bgpTemplatesService: BgpTemplatesService) {}

  @Post()
  create(@Body() createBgpTemplateDto: CreateBgpTemplateDto) {
    return this.bgpTemplatesService.create(createBgpTemplateDto);
  }

  @Get()
  findAll() {
    return this.bgpTemplatesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    if (!id.startsWith("*")) id = `*${id}`;
    return this.bgpTemplatesService.findOne(id);
  }

  // @Patch(":id")
  // update(
  //   @Param("id") id: string,
  //   @Body() updateBgpTemplateDto: UpdateBgpTemplateDto,
  // ) {
  //   if (!id.startsWith("*")) id = `*${id}`;
  //   return this.bgpTemplatesService.update(id, updateBgpTemplateDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   if (!id.startsWith("*")) id = `*${id}`;
  //   return this.bgpTemplatesService.remove(id);
  // }
}
