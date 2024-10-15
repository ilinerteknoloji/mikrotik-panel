import { HttpException, Injectable } from "@nestjs/common";
import { EnvService } from "src/shared/env/env.service";
import { CreateQueueDto } from "./dto/create-queue.dto";
import { UpdateQueueDto } from "./dto/update-queue.dto";

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
      body: JSON.stringify(this.jsonToMikrotik(createQueueDto)),
    });
    const json = await response.json();
    if (!response.ok)
      throw new HttpException(
        json?.detail ?? response.statusText,
        response.status,
      );
    return json;
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

  public async update(id: string, updateQueueDto: UpdateQueueDto) {
    const response = await fetch(`${this.host}/rest/queue/simple/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.jsonToMikrotik(updateQueueDto)),
    });
    const json = await response.json();
    if (!response.ok)
      throw new HttpException(
        json?.detail ?? response.statusText,
        response.status,
      );
    return json;
  }

  private jsonToMikrotik(dto: UpdateQueueDto) {
    return {
      name: dto.name,
      target: dto.target,
      "max-limit": dto.maxLimit,
      "limit-at": dto.limitAt,
      priority: dto.priority,
    };
  }
}
