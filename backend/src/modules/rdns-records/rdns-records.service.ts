import { Injectable } from "@nestjs/common";
import { CreateRdnsRecordDto } from "./dto/create-rdns-record.dto";
import { UpdateRdnsRecordDto } from "./dto/update-rdns-record.dto";
import { RdnsRecordsRepository } from "./rdns-records.repository";

@Injectable()
export class RdnsRecordsService {
  constructor(private readonly rdnsRecordsRepository: RdnsRecordsRepository) {}
  create(createRdnsRecordDto: CreateRdnsRecordDto) {
    console.log(createRdnsRecordDto);

    return "This action adds a new rdnsRecord";
  }

  findAll(page: number, limit: number) {
    return this.rdnsRecordsRepository.findAll(page, limit);
  }

  findOne(id: number) {
    return `This action returns a #${id} rdnsRecord`;
  }

  update(id: number, updateRdnsRecordDto: UpdateRdnsRecordDto) {
    console.log(updateRdnsRecordDto);
    return `This action updates a #${id} rdnsRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} rdnsRecord`;
  }
}
