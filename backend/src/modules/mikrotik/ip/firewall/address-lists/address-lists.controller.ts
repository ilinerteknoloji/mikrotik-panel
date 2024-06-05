import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "src/lib/decorators/roles.decorator";
import { UserRole } from "src/lib/enums/user-role.enum";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { AddressListsService } from "./address-lists.service";
import { CreateAddressListDto } from "./dto/create-address-list.dto";
import { UpdateAddressListDto } from "./dto/update-address-list.dto";
import { User } from "src/lib/decorators/user.decorator";
import { RequestUserType } from "src/types";

@Controller("address-lists")
@UseGuards(AuthGuard)
@Roles(UserRole.ADMIN)
export class AddressListsController {
  constructor(private readonly addressListsService: AddressListsService) {}

  @Post()
  create(@Body() createAddressListDto: CreateAddressListDto) {
    return this.addressListsService.create(createAddressListDto);
  }

  @Get()
  findAll() {
    return this.addressListsService.findAll();
  }

  @Get(":id")
  @Roles(UserRole.ADMIN, UserRole.USER)
  findOne(@Param("id") id: string, @User() user: RequestUserType) {
    return this.addressListsService.findOne(id, user);
  }

  @Patch(":id")
  @Roles(UserRole.ADMIN, UserRole.USER)
  update(
    @Param("id") id: string,
    @Body() updateAddressListDto: UpdateAddressListDto,
    @User() user: RequestUserType,
  ) {
    return this.addressListsService.update(id, updateAddressListDto, user);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.addressListsService.remove(+id);
  }
}
