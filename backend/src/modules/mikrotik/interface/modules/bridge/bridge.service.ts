import { Injectable } from "@nestjs/common";
import { BridgeRepository } from "./bridge.repository";
import { CreateBridgeDto } from "./dto/create-bridge.dto";

@Injectable()
export class BridgeService {
  constructor(private readonly bridgeRepository: BridgeRepository) {}

  public async create(createBridgeDto: CreateBridgeDto) {
    const response = await this.bridgeRepository.create(createBridgeDto);
    return {
      message: "Bridge created successfully",
    };
  }
}
