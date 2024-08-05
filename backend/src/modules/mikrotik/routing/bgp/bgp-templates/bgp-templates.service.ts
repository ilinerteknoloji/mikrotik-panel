import { Injectable } from "@nestjs/common";
import { CreateBgpTemplateDto } from "./dto/create-bgp-template.dto";
import { UpdateBgpTemplateDto } from "./dto/update-bgp-template.dto";
import { BgpTemplatesRepository } from "./bgp-templates.repository";

@Injectable()
export class BgpTemplatesService {
  constructor(
    private readonly bgpTemplatesRepository: BgpTemplatesRepository,
  ) {}

  async create(createBgpTemplateDto: CreateBgpTemplateDto) {
    const response =
      await this.bgpTemplatesRepository.create(createBgpTemplateDto);
    const data = await this.bgpTemplatesRepository.findOne(response.ret);
    return data;
  }

  async findAll() {
    return this.bgpTemplatesRepository.findAll();
  }

  async findOne(id: string) {
    return this.bgpTemplatesRepository.findOne(id);
  }

  async update(id: string, updateBgpTemplateDto: UpdateBgpTemplateDto) {
    console.log(updateBgpTemplateDto);

    return `This action updates a #${id} bgpTemplate`;
  }

  async remove(id: string) {
    return `This action removes a #${id} bgpTemplate`;
  }
}
