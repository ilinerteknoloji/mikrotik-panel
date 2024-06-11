import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "src/lib/decorators/roles.decorator";
import { User } from "src/lib/decorators/user.decorator";
import { UserRole } from "src/lib/enums/user-role.enum";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { RequestUserType } from "src/types";
import { AddressListsService } from "./address-lists.service";
import { UpdateAddressListDto } from "./dto/update-address-list.dto";

@Controller("address-lists")
@UseGuards(AuthGuard)
@Roles(UserRole.ADMIN)
export class AddressListsController {
  constructor(private readonly addressListsService: AddressListsService) {}

  @Get()
  findAll() {
    return this.addressListsService.findAll();
  }

  @Get(":id")
  @Roles(UserRole.ADMIN, UserRole.USER)
  findOne(@Param("id") id: string, @User() user: RequestUserType) {
    return this.addressListsService.findOne(id, user);
  }

  @Patch()
  @Roles(UserRole.ADMIN, UserRole.USER)
  update(
    @Body() updateAddressListDto: UpdateAddressListDto,
    @User() user: RequestUserType,
  ) {
    return this.addressListsService.update(updateAddressListDto, user);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.addressListsService.remove(+id);
  }
}
