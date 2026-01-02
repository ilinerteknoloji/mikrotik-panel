import {Injectable} from "@nestjs/common";
import {CreateTableDto} from "./dto/create-table.dto";
import {UpdateTableDto} from "./dto/update-table.dto";
import {TablesRepository} from "./tables.repository";

@Injectable()
export class TablesService {
  constructor(private readonly tablesRepository: TablesRepository) {}

  async create(createTableDto: CreateTableDto) {
    const response = await this.tablesRepository.create(createTableDto);
    const data = await this.tablesRepository.findOne(response.ret);
    return data;
  }

  findAll() {
    return this.tablesRepository.findAll();
  }

  findOne(id: string) {
    return this.tablesRepository.findOne(id);
  }

  async update(id: string, updateTableDto: UpdateTableDto) {
    await this.tablesRepository.update(id, updateTableDto);
    return this.tablesRepository.findOne(id);
  }

  remove(id: string) {
    return `This action removes a #${id} table`;
  }
}
