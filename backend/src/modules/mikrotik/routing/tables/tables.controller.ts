import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateTableDto } from "./dto/create-table.dto";
import { TablesService } from "./tables.service";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { UseRoles } from "src/lib/decorators/roles.decorator";
import { UserRole } from "src/lib/enums/user-role.enum";

@Controller("routing/tables")
@UseGuards(AuthGuard, RolesGuard)
@UseRoles(UserRole.ADMIN)
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.create(createTableDto);
  }

  @Get()
  findAll() {
    return this.tablesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    if (!id.startsWith("*")) id = `*${id}`;
    return this.tablesService.findOne(id);
  }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateTableDto: UpdateTableDto) {
  //   return this.tablesService.update(id, updateTableDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.tablesService.remove(id);
  // }
}
