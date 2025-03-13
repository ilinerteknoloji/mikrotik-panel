import {Injectable} from "@nestjs/common";
import {CreateRdnsHostDto} from "./dto/create-rdns-host.dto";
import {UpdateRdnsHostDto} from "./dto/update-rdns-host.dto";
import {RdnsHostsRepository} from "./rdns-hosts.repository";
import {RdnsHostsSchemaType} from "src/shared/drizzle/schemas";
import {OrderByPipeType} from "src/types";

@Injectable()
export class RdnsHostsService {
  constructor(private readonly rdnsHostsRepository: RdnsHostsRepository) {}

  create(createRdnsHostDto: CreateRdnsHostDto) {
    return this.rdnsHostsRepository.create(createRdnsHostDto);
  }

  findAll(
    page: number,
    limit: number,
    search: string,
    status: boolean | undefined,
    orderBy: OrderByPipeType<RdnsHostsSchemaType>,
  ) {
    return this.rdnsHostsRepository.findAll(
      page,
      limit,
      search,
      status,
      orderBy,
    );
  }

  findOne(id: number) {
    return this.rdnsHostsRepository.findOne(id);
  }

  async update(id: number, updateRdnsHostDto: UpdateRdnsHostDto) {
    const response = await this.rdnsHostsRepository.update(
      id,
      updateRdnsHostDto,
    );
    return response;
  }
}
