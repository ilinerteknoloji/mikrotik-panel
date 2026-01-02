import { Injectable } from "@nestjs/common";
import { CreateInterfaceDto } from "./dto/create-interface.dto";
import { UpdateInterfaceDto } from "./dto/update-interface.dto";
import { InterfaceRepository } from "./interface.repository";

@Injectable()
export class InterfaceService {
  constructor(private readonly interfaceRepository: InterfaceRepository) {}

  public async create(createInterfaceDto: CreateInterfaceDto) {
    console.log(createInterfaceDto);
    return "This action adds a new interface";
  }

  public async findAll() {
    const interfaces = await this.interfaceRepository.fetchAll();
    return interfaces;
  }

  public async findOne(id: string) {
    if (!id.startsWith("*")) id = `*${id}`;
    return await this.interfaceRepository.fetchById(id);
  }

  public async update(id: number, updateInterfaceDto: UpdateInterfaceDto) {
    console.log(updateInterfaceDto);
    return `This action updates a #${id} interface`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} interface`;
  }
}
