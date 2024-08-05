import { Injectable } from "@nestjs/common";
import { CreateBgpConnectionDto } from "./dto/create-bgp-connection.dto";
import { UpdateBgpConnectionDto } from "./dto/update-bgp-connection.dto";
import { BgpConnectionRepository } from "./bgp-connection.repository";

@Injectable()
export class BgpConnectionService {
  constructor(
    private readonly bgpConnectionRepository: BgpConnectionRepository,
  ) {}

  async create(createBgpConnectionDto: CreateBgpConnectionDto) {
    const response = await this.bgpConnectionRepository.create(
      createBgpConnectionDto,
    );
    const data = await this.bgpConnectionRepository.findOne(response.ret);
    return data;
  }

  findAll() {
    return this.bgpConnectionRepository.findAll();
  }

  findOne(id: string) {
    return this.bgpConnectionRepository.findOne(id);
  }

  update(id: string, updateBgpConnectionDto: UpdateBgpConnectionDto) {
    console.log(updateBgpConnectionDto);

    return `This action updates a #${id} bgpConnection`;
  }

  remove(id: string) {
    return `This action removes a #${id} bgpConnection`;
  }
}
