import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BgpConnectionService } from "./bgp-connection.service";
import { CreateBgpConnectionDto } from "./dto/create-bgp-connection.dto";
import { UpdateBgpConnectionDto } from "./dto/update-bgp-connection.dto";

@Controller("routing/bgp/connection")
export class BgpConnectionController {
  constructor(private readonly bgpConnectionService: BgpConnectionService) {}

  @Post()
  create(@Body() createBgpConnectionDto: CreateBgpConnectionDto) {
    return this.bgpConnectionService.create(createBgpConnectionDto);
  }

  @Get()
  findAll() {
    return this.bgpConnectionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bgpConnectionService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateBgpConnectionDto: UpdateBgpConnectionDto,
  ) {
    return this.bgpConnectionService.update(+id, updateBgpConnectionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bgpConnectionService.remove(+id);
  }
}
