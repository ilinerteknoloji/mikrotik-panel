import { Injectable } from "@nestjs/common";
import { BridgeRepository } from "./bridge.repository";
import { CreateBridgeDto } from "./dto/create-bridge.dto";
import { InterfaceRepository } from "../../interface.repository";
import { UpdateBridgeDto } from "./dto/update-bridge.dto";

@Injectable()
export class BridgeService {
  constructor(
    private readonly bridgeRepository: BridgeRepository,
    private readonly interfaceRepository: InterfaceRepository,
  ) {}

  public async create(createBridgeDto: CreateBridgeDto) {
    const response = await this.bridgeRepository.create(createBridgeDto);
    const bridge = await this.interfaceRepository.fetchById(response.ret);
    return bridge;
  }

  public async update(id: string, updateBridgeDto: UpdateBridgeDto) {
    const response = await this.bridgeRepository.update(id, updateBridgeDto);
    const bridge = await this.interfaceRepository.fetchById(response[".id"]);
    return bridge;
  }
}
