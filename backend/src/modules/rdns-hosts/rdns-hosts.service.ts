import { Injectable } from "@nestjs/common";
import { CreateRdnsHostDto } from "./dto/create-rdns-host.dto";
import { UpdateRdnsHostDto } from "./dto/update-rdns-host.dto";
import { RdnsHostsRepository } from "./rdns-hosts.repository";

@Injectable()
export class RdnsHostsService {
  constructor(private readonly rdnsHostsRepository: RdnsHostsRepository) {}

  create(createRdnsHostDto: CreateRdnsHostDto) {
    return this.rdnsHostsRepository.create(createRdnsHostDto);
  }

  findAll() {
    return this.rdnsHostsRepository.findAll();
  }

  findOne(id: number) {
    return this.rdnsHostsRepository.findOne(id);
  }

  update(id: number, updateRdnsHostDto: UpdateRdnsHostDto) {
    return this.update(id, updateRdnsHostDto);
  }
}
