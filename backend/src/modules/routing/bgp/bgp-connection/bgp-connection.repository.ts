import { HttpException, Injectable } from "@nestjs/common";
import { EnvService } from "src/shared/env/env.service";
import { CreateBgpConnectionDto } from "./dto/create-bgp-connection.dto";

@Injectable()
export class BgpConnectionRepository {
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

  public async create(createBgpDto: CreateBgpConnectionDto) {
    const response = await fetch(
      `${this.host}/rest/routing/bgp/connection/add`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${this.auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.dtoToMikrotikKeys(createBgpDto)),
      },
    );
    const json = await response.json();
    if (!response.ok)
      throw new HttpException(
        json?.detail ?? response.statusText,
        response.status,
      );
    return `This action adds a new bgp`;
  }

  private dtoToMikrotikKeys(createBgpDto: CreateBgpConnectionDto) {
    const mikrotikKeys = {};
    Object.keys(createBgpDto).forEach((key) => {
      const mikrotikKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      mikrotikKeys[mikrotikKey] = createBgpDto[key];
    });
    return mikrotikKeys;
  }
}
