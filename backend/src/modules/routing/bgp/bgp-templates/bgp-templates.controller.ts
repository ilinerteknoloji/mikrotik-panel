import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BgpTemplatesService } from "./bgp-templates.service";
import { CreateBgpTemplateDto } from "./dto/create-bgp-template.dto";
import { UpdateBgpTemplateDto } from "./dto/update-bgp-template.dto";

@Controller("routing/bgp/templates")
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
    return this.bgpTemplatesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateBgpTemplateDto: UpdateBgpTemplateDto,
  ) {
    return this.bgpTemplatesService.update(+id, updateBgpTemplateDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bgpTemplatesService.remove(+id);
  }
}
