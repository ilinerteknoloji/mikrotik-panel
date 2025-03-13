import {Module} from "@nestjs/common";
import {GenerateKeysModule} from "src/shared/keys/generate-keys.module";
import {RdnsRecordsController} from "./rdns-records.controller";
import {RdnsRecordsRepository} from "./rdns-records.repository";
import {RdnsRecordsService} from "./rdns-records.service";

@Module({
  controllers: [RdnsRecordsController],
  providers: [RdnsRecordsService, RdnsRecordsRepository],
  imports: [GenerateKeysModule],
})
export class RdnsRecordsModule {}
