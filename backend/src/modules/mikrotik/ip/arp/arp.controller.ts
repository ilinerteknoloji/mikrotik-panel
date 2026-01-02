import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {UseRoles} from "src/lib/decorators/roles.decorator";
import {UserRole} from "src/lib/enums/user-role.enum";
import {AuthGuard} from "src/modules/auth/guards/auth.guard";
import {RolesGuard} from "src/modules/auth/guards/roles.guard";
import {ArpService} from "./arp.service";
import {CreateArpDto} from "./dto/create-arp.dto";
import {UpdateArpDto} from "./dto/update-arp.dto";

@Controller("ip/arps")
@UseGuards(AuthGuard, RolesGuard)
@UseRoles(UserRole.ADMIN)
export class ArpController {
  constructor(private readonly arpService: ArpService) {}

  @Post()
  create(@Body() createArpDto: CreateArpDto) {
    return this.arpService.create(createArpDto);
  }

  @Get()
  findAll() {
    return this.arpService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    if (!id.startsWith("*")) id = `*${id}`;
    return this.arpService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateArpDto: UpdateArpDto) {
    if (!id.startsWith("*")) id = `*${id}`;
    return this.arpService.update(id, updateArpDto);
  }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   if (!id.startsWith("*")) id = `*${id}`;
  //   return this.arpService.remove(id);
  // }
}
