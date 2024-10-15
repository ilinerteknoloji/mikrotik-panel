import { Injectable } from "@nestjs/common";
import { CreateQueueDto } from "./dto/create-queue.dto";
import { UpdateQueueDto } from "./dto/update-queue.dto";
import { QueuesRepository } from "./queues.repository";

@Injectable()
export class QueuesService {
  constructor(private readonly queuesRepository: QueuesRepository) {}

  public async create(createQueueDto: CreateQueueDto) {
    const response = await this.queuesRepository.create(createQueueDto);
    const data = await this.queuesRepository.findById(response?.ret);
    return data;
  }

  public async findAll() {
    return this.queuesRepository.findAll();
  }

  public async findOne(id: string) {
    return this.queuesRepository.findById(id);
  }

  public async update(id: string, updateQueueDto: UpdateQueueDto) {
    const response = await this.queuesRepository.update(id, updateQueueDto);
    const data = await this.queuesRepository.findById(response[".id"]);
    return data;
  }

  public async remove(id: string) {
    return `This action removes a #${id} queue`;
  }
}
