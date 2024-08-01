import { Injectable } from "@nestjs/common";
import { CreateTableDto } from "./dto/create-table.dto";
import { UpdateTableDto } from "./dto/update-table.dto";
import { TablesRepository } from "./tables.repository";

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

  update(id: string, updateTableDto: UpdateTableDto) {
    console.log(updateTableDto);

    return `This action updates a #${id} table`;
  }

  remove(id: string) {
    return `This action removes a #${id} table`;
  }
}
