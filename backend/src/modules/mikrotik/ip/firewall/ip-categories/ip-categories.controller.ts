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
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { CreateIpCategoryDto } from "./dto/create-ip-category.dto";
import { UpdateIpCategoryDto } from "./dto/update-ip-category.dto";
import { IpCategoriesService } from "./ip-categories.service";

@Controller("ip-categories")
@UseGuards(AuthGuard, RolesGuard)
@UseRoles(UserRole.ADMIN)
export class IpCategoriesController {
  constructor(private readonly ipCategoriesService: IpCategoriesService) {}

  @Post()
  public create(@Body() createIpCategoryDto: CreateIpCategoryDto) {
    return this.ipCategoriesService.create(createIpCategoryDto);
  }

  @Get()
  @UseRoles(UserRole.ADMIN, UserRole.USER)
  public findAll() {
    return this.ipCategoriesService.findAll();
  }

  @Get(":id")
  @UseRoles(UserRole.ADMIN, UserRole.USER)
  public findOne(@Param("id") id: string) {
    return this.ipCategoriesService.findOne(+id);
  }

  @Patch(":id")
  public update(
    @Param("id") id: string,
    @Body() updateIpCategoryDto: UpdateIpCategoryDto,
  ) {
    return this.ipCategoriesService.update(+id, updateIpCategoryDto);
  }

  // @Delete(":id")
  // public remove(@Param("id") id: string) {
  //   return this.ipCategoriesService.remove(+id);
  // }
}
