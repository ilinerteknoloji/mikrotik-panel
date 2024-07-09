import { Injectable } from "@nestjs/common";
import { CreateGreTunnelDto } from "./dto/create-gre-tunnel.dto";
import { UpdateGreTunnelDto } from "./dto/update-gre-tunnel.dto";
import { GreTunnelRepository } from "./gre-tunnel.repository";

@Injectable()
export class GreTunnelService {
  constructor(private readonly greTunnelRepository: GreTunnelRepository) {}

  public async create(createGreTunnelDto: CreateGreTunnelDto) {
    const response = await this.greTunnelRepository.create(createGreTunnelDto);
    return {
      message: "GRE Tunnel created successfully",
    };
  }

  public async findAll() {
    return `This action returns all greTunnel`;
  }

  public async findOne(id: number) {
    return `This action returns a #${id} greTunnel`;
  }

  public async update(id: number, updateGreTunnelDto: UpdateGreTunnelDto) {
    console.log(updateGreTunnelDto);

    return `This action updates a #${id} greTunnel`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} greTunnel`;
  }
}
