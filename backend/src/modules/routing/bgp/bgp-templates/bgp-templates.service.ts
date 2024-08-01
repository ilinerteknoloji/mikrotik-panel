import { Injectable } from "@nestjs/common";
import { CreateBgpTemplateDto } from "./dto/create-bgp-template.dto";
import { UpdateBgpTemplateDto } from "./dto/update-bgp-template.dto";
import { BgpTemplatesRepository } from "./bgp-templates.repository";

@Injectable()
export class BgpTemplatesService {
  constructor(
    private readonly bgpTemplatesRepository: BgpTemplatesRepository,
  ) {}

  create(createBgpTemplateDto: CreateBgpTemplateDto) {
    console.log(createBgpTemplateDto);

    return "This action adds a new bgpTemplate";
  }

  findAll() {
    return `This action returns all bgpTemplates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bgpTemplate`;
  }

  update(id: number, updateBgpTemplateDto: UpdateBgpTemplateDto) {
    console.log(updateBgpTemplateDto);

    return `This action updates a #${id} bgpTemplate`;
  }

  remove(id: number) {
    return `This action removes a #${id} bgpTemplate`;
  }
}
