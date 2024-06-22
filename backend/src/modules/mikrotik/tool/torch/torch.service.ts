import { Injectable, NotFoundException } from "@nestjs/common";
import { InterfaceRepository } from "../../interface/interface.repository";
import { CreateTorchDto } from "./dto/create-torch.dto";
import { UpdateTorchDto } from "./dto/update-torch.dto";
import { TorchRepository } from "./torch.repository";

@Injectable()
export class TorchService {
  constructor(
    private readonly torchRepository: TorchRepository,
    private readonly interfaceRepository: InterfaceRepository,
  ) {}

  public async create(createTorchDto: CreateTorchDto) {
    const interfaces = await this.interfaceRepository.fetchAll();
    const interfaceExists = interfaces.find(
      (i) => i.name === createTorchDto.interface,
    );
    if (!interfaceExists)
      throw new NotFoundException("Interface does not exist");
    const torchData = await this.torchRepository.create(createTorchDto);
    return {
      name: new Date().toLocaleString("tr"),
      torchData,
    };
    // return "This action adds a new torch";
  }

  public async findAll() {
    return `This action returns all torch`;
  }

  public async findOne(id: number) {
    return `This action returns a #${id} torch`;
  }

  public async update(id: number, updateTorchDto: UpdateTorchDto) {
    return `This action updates a #${id} torch`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} torch`;
  }
}
