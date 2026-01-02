import { Injectable } from "@nestjs/common";
import { CreateGreTunnelDto } from "./dto/create-gre-tunnel.dto";
import { UpdateGreTunnelDto } from "./dto/update-gre-tunnel.dto";
import { GreTunnelRepository } from "./gre-tunnel.repository";
import { InterfaceRepository } from "../../interface.repository";

@Injectable()
export class GreTunnelService {
  constructor(
    private readonly greTunnelRepository: GreTunnelRepository,
    private readonly interfaceRepository: InterfaceRepository,
  ) {}

  public async create(createGreTunnelDto: CreateGreTunnelDto) {
    const response = await this.greTunnelRepository.create(createGreTunnelDto);
    const greTunnel = await this.interfaceRepository.fetchById(response.ret);
    return greTunnel;
  }

  public async findAll() {
    return `This action returns all greTunnel`;
  }

  public async findOne(id: string) {
    return await this.greTunnelRepository.findOne(id);
  }

  public async update(id: string, updateGreTunnelDto: UpdateGreTunnelDto) {
    const response = await this.greTunnelRepository.update(
      id,
      updateGreTunnelDto,
    );
    const greTunnel = await this.interfaceRepository.fetchById(response[".id"]);
    return greTunnel;
  }

  public async remove(id: number) {
    return `This action removes a #${id} greTunnel`;
  }
}
