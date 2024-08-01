import { Injectable } from "@nestjs/common";
import { CreateBgpConnectionDto } from "./dto/create-bgp-connection.dto";
import { UpdateBgpConnectionDto } from "./dto/update-bgp-connection.dto";
import { BgpConnectionRepository } from "./bgp-connection.repository";

@Injectable()
export class BgpConnectionService {
  constructor(
    private readonly bgpConnectionRepository: BgpConnectionRepository,
  ) {}

  create(createBgpConnectionDto: CreateBgpConnectionDto) {
    return this.bgpConnectionRepository.create(createBgpConnectionDto);
  }

  findAll() {
    return `This action returns all bgpConnection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bgpConnection`;
  }

  update(id: number, updateBgpConnectionDto: UpdateBgpConnectionDto) {
    console.log(updateBgpConnectionDto);

    return `This action updates a #${id} bgpConnection`;
  }

  remove(id: number) {
    return `This action removes a #${id} bgpConnection`;
  }
}
