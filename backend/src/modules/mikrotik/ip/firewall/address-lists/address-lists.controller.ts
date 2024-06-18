import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
@Roles(UserRole.ADMIN, UserRole.USER)
export class AddressListsController {
  constructor(private readonly addressListsService: AddressListsService) {}

  @Get()
  public findAll(@User() user: RequestUserType) {
    return this.addressListsService.findAll(user);
  }

  @Get(":id")
  public findOne(
    @Param("id", ParseIntPipe) mikrotikUserIpsId: number,
    @User() user: RequestUserType,
  ) {
    return this.addressListsService.findOne(mikrotikUserIpsId, user);
  }

  @Patch()
  public update(
    @Body() updateAddressListDto: UpdateAddressListDto,
    @User() user: RequestUserType,
  ) {
    return this.addressListsService.update(updateAddressListDto, user);
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN)
  public remove(@Param("id") id: string) {
    return this.addressListsService.remove(+id);
  }
}
