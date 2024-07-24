import { HttpException, Injectable } from "@nestjs/common";
import { EnvService } from "src/shared/env/env.service";
import { CreateQueueDto } from "./dto/create-queue.dto";

@Injectable()
export class QueuesRepository {
  private readonly host: string;
  private readonly username: string;
  private readonly password: string;
  private readonly auth: string;

  constructor(private readonly env: EnvService) {
    this.host = this.env.get("MIKROTIK_HOST");
    this.username = this.env.get("MIKROTIK_USERNAME");
    this.password = this.env.get("MIKROTIK_PASSWORD");
    this.auth = btoa(`${this.username}:${this.password}`);
  }

  public async create(createQueueDto: CreateQueueDto) {
    const response = await fetch(`${this.host}/rest/queue/simple/add`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.createQueueToMikrotikJson(createQueueDto)),
    });
    const json = await response.json();
    if (!response.ok)
      throw new HttpException(
        json?.detail ?? response.statusText,
        response.status,
      );
    return json;
  }

  private createQueueToMikrotikJson(createQueueDto: CreateQueueDto) {
    return {
      name: createQueueDto.name,
      target: createQueueDto.target,
      "max-limit": createQueueDto.maxLimit,
      "limit-at": createQueueDto.limitAt,
      priority: createQueueDto.priority,
    };
  }

  public async findAll() {
    const response = await fetch(`${this.host}/rest/queue/simple`, {
      headers: {
        Authorization: `Basic ${this.auth}`,
      },
    });
    const json = await response.json();
    if (!response.ok)
      throw new HttpException(
        json?.detail ?? response.statusText,
        response.status,
      );
    return json;
  }

  public async findById(id: string) {
    const response = await fetch(`${this.host}/rest/queue/simple/${id}`, {
      headers: {
        Authorization: `Basic ${this.auth}`,
      },
    });
    const json = await response.json();
    if (!response.ok)
      throw new HttpException(
        json?.detail ?? response.statusText,
        response.status,
      );
    return json;
  }
}
