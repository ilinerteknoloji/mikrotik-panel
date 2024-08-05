import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BgpConnectionService } from "./bgp-connection.service";
import { CreateBgpConnectionDto } from "./dto/create-bgp-connection.dto";

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
    if (!id.startsWith("*")) id = `*${id}`;
    return this.bgpConnectionService.findOne(id);
  }

  // @Patch(":iø
}
