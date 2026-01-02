import { Injectable } from "@nestjs/common";
import { CreateIpTunnelDto } from "./dto/create-ip-tunnel.dto";
import { UpdateIpTunnelDto } from "./dto/update-ip-tunnel.dto";
import { IpTunnelRepository } from "./ip-tunnel.repository";
import { InterfaceRepository } from "../../interface.repository";

@Injectable()
export class IpTunnelService {
  constructor(
    private readonly ipTunnelRepository: IpTunnelRepository,
    private readonly interfaceRepository: InterfaceRepository,
  ) {}

  public async create(createIpTunnelDto: CreateIpTunnelDto) {
    const response = await this.ipTunnelRepository.create(createIpTunnelDto);
    const ipTunnel = await this.interfaceRepository.fetchById(response.ret);
    return ipTunnel;
  }

  public async findAll() {
    return `This action returns all ipTunnel`;
  }

  public async findOne(id: string) {
    return await this.ipTunnelRepository.findOne(id);
  }

  public async update(id: string, updateIpTunnelDto: UpdateIpTunnelDto) {
    const response = await this.ipTunnelRepository.update(
      id,
      updateIpTunnelDto,
    );
    const ipTunnel = await this.interfaceRepository.fetchById(response[".id"]);
    return ipTunnel;
  }

  public async remove(id: string) {
    return `This action removes a #${id} ipTunnel`;
  }
}
