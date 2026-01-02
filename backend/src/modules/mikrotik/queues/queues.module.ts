import { Module } from "@nestjs/common";
import { QueuesService } from "./queues.service";
import { QueuesController } from "./queues.controller";
import { QueuesRepository } from "./queues.repository";

@Module({
  controllers: [QueuesController],
  providers: [QueuesService, QueuesRepository],
})
export class QueuesModule {}
// https://wiki.mikrotik.com/wiki/Manual:Queue
