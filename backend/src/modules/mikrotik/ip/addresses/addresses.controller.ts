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
import { AddressesService } from "./addresses.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Controller("ip/addresses")
@UseGuards(AuthGuard, RolesGuard)
@UseRoles(UserRole.ADMIN)
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    if (!id.startsWith("*")) id = `*${id}`;
    return this.addressesService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAddressDto: UpdateAddressDto) {
    if (!id.startsWith("*")) id = `*${id}`;
    return this.addressesService.update(id, updateAddressDto);
  }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   if (!id.startsWith("*")) id = `*${id}`;
  //   return this.addressesService.remove(id);
  // }
}
