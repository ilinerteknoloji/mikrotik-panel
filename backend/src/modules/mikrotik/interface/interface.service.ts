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
    const publicInterfaces: Record<string, string>[] = [];
    interfaces.forEach((item) => {
      if (item.disabled === "false") {
        publicInterfaces.push({
          id: item[".id"],
          defaultName: item["default-name"],
          name: item.name,
          type: item.type,
        });
      }
    });
    return publicInterfaces;
  }

  public async findOne(id: number) {
    return `This action returns a #${id} interface`;
  }

  public async update(id: number, updateInterfaceDto: UpdateInterfaceDto) {
    console.log(updateInterfaceDto);
    return `This action updates a #${id} interface`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} interface`;
  }
}
