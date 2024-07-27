import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { RdnsRecordsService } from "./rdns-records.service";
import { CreateRdnsRecordDto } from "./dto/create-rdns-record.dto";
import { UpdateRdnsRecordDto } from "./dto/update-rdns-record.dto";
import { LimitPipe, PagePipe } from "src/lib/pipes";

@Controller("rdns-records")
export class RdnsRecordsController {
  constructor(private readonly rdnsRecordsService: RdnsRecordsService) {}

  @Post()
  create(@Body() createRdnsRecordDto: CreateRdnsRecordDto) {
    return this.rdnsRecordsService.create(createRdnsRecordDto);
  }

  @Get()
  findAll(
    @Query("page", PagePipe) page: number,
    @Query("limit", LimitPipe) limit: number,
  ) {
    return this.rdnsRecordsService.findAll(page, limit);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.rdnsRecordsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRdnsRecordDto: UpdateRdnsRecordDto,
  ) {
    return this.rdnsRecordsService.update(+id, updateRdnsRecordDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.rdnsRecordsService.remove(+id);
  }
}
