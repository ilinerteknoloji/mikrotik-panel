import { Injectable } from "@nestjs/common";
import { CreateTableDto } from "./dto/create-table.dto";
import { UpdateTableDto } from "./dto/update-table.dto";
import { TablesRepository } from "./tables.repository";

@Injectable()
export class TablesService {
  constructor(private readonly tablesRepository: TablesRepository) {}

  create(createTableDto: CreateTableDto) {
    console.log(createTableDto);

    return "This action adds a new table";
  }

  findAll() {
    return `This action returns all tables`;
  }

  findOne(id: number) {
    return `This action returns a #${id} table`;
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    console.log(updateTableDto);

    return `This action updates a #${id} table`;
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
}
