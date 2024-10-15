import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateQueueDto } from "./dto/create-queue.dto";
import { QueuesService } from "./queues.service";
import { UpdateQueueDto } from "./dto/update-queue.dto";

@Controller("queues")
export class QueuesController {
  constructor(private readonly queuesService: QueuesService) {}

  @Post()
  public create(@Body() createQueueDto: CreateQueueDto) {
    return this.queuesService.create(createQueueDto);
  }

  @Get()
  public findAll() {
    return this.queuesService.findAll();
  }

  @Get(":id")
  public findOne(@Param("id") id: string) {
    if (!id.startsWith("*")) id = `*${id}`;
    return this.queuesService.findOne(id);
  }

  @Patch(":id")
  public update(
    @Param("id") id: string,
    @Body() updateQueueDto: UpdateQueueDto,
  ) {
    if (!id.startsWith("*")) id = `*${id}`;
    return this.queuesService.update(id, updateQueueDto);
  }

  // @Delete(":id")
  // public remove(@Param("id") id: string) {
  //   if (!id.startsWith("*")) id = `*${id}`;
  //   return this.queuesService.remove(id);
  // }
}
