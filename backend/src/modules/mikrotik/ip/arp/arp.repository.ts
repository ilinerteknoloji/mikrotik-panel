import { HttpException, Injectable } from "@nestjs/common";
import { EnvService } from "src/shared/env/env.service";
import { CreateArpDto } from "./dto/create-arp.dto";

@Injectable()
export class ArpRepository {
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

  public async create(createArpDto: CreateArpDto) {
    const response = await fetch(`${this.host}/rest/ip/arp/add`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.dtoToMikrotik(createArpDto)),
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
    const response = await fetch(`${this.host}/rest/ip/arp`, {
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

  public async findOne(id: string) {
    const response = await fetch(`${this.host}/rest/ip/arp/${id}`, {
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

  private dtoToMikrotik(createArpDto: CreateArpDto) {
    return {
      comment: createArpDto.comment,
      address: createArpDto.address,
      interface: createArpDto.interface,
      "mac-address": createArpDto.macAddress,
      published: createArpDto.published,
    };
  }
}
