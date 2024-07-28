import { Injectable } from "@nestjs/common";
import { RequestUserType } from "src/types";
import { CreateRdnsRecordDto } from "./dto/create-rdns-record.dto";
import { RdnsRecordsRepository } from "./rdns-records.repository";

@Injectable()
export class RdnsRecordsService {
  constructor(private readonly rdnsRecordsRepository: RdnsRecordsRepository) {}
  public async create(createRdnsRecordDto: CreateRdnsRecordDto) {
    console.log(createRdnsRecordDto);

    return "This action adds a new rdnsRecord";
  }

  public async findAll(
    page: number,
    limit: number,
    search: string,
    user: RequestUserType,
  ) {
    if (user.role === "user")
      return this.rdnsRecordsRepository.findUsersRecords(page, limit, user.id);
    return this.rdnsRecordsRepository.findAll(page, limit, search);
  }

  public async findOne(id: string, domainName: string) {
    return this.rdnsRecordsRepository.findOne(id, domainName);
  }

  public async update(
    id: string,
    domainName: string,
    host: string,
    record: string,
    user: RequestUserType,
  ) {
    if (user.role === "user")
      return this.rdnsRecordsRepository.update(id, domainName, host, record);
    return this.rdnsRecordsRepository.updateForUser(
      id,
      domainName,
      host,
      record,
      user,
    );
  }

  public async remove(id: number) {
    return `This action removes a #${id} rdnsRecord`;
  }
}
