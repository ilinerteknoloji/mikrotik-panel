import { Injectable } from "@nestjs/common";
import { CreateArpDto } from "./dto/create-arp.dto";
import { UpdateArpDto } from "./dto/update-arp.dto";
import { ArpRepository } from "./arp.repository";

@Injectable()
export class ArpService {
  constructor(private readonly arpRepository: ArpRepository) {}

  async create(createArpDto: CreateArpDto) {
    const response = await this.arpRepository.create(createArpDto);
    const data = await this.arpRepository.findOne(response.ret);
    return data;
  }

  findAll() {
    return this.arpRepository.findAll();
  }

  findOne(id: string) {
    return this.arpRepository.findOne(id);
  }

  update(id: string, updateArpDto: UpdateArpDto) {
    console.log(updateArpDto);

    return `This action updates a #${id} arp`;
  }

  remove(id: string) {
    return `This action removes a #${id} arp`;
  }
}
