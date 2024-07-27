import { Module } from "@nestjs/common";
import { RdnsRecordsService } from "./rdns-records.service";
import { RdnsRecordsController } from "./rdns-records.controller";
import { RdnsRecordsRepository } from "./rdns-records.repository";

@Module({
  controllers: [RdnsRecordsController],
  providers: [RdnsRecordsService, RdnsRecordsRepository],
})
export class RdnsRecordsModule {}
