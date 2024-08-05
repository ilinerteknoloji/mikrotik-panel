import { HttpException, Injectable } from "@nestjs/common";
import { EnvService } from "src/shared/env/env.service";
import { CreateBgpConnectionDto } from "./dto/create-bgp-connection.dto";
import { UpdateBgpConnectionDto } from "./dto/update-bgp-connection.dto";

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
    return json;
  }

  public async findAll() {
    const response = await fetch(`${this.host}/rest/routing/bgp/connection`, {
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
    const response = await fetch(
      `${this.host}/rest/routing/bgp/connection/${id}`,
      {
        headers: {
          Authorization: `Basic ${this.auth}`,
        },
      },
    );
    const json = await response.json();
    if (!response.ok)
      throw new HttpException(
        json?.detail ?? response.statusText,
        response.status,
      );
    return json;
  }

  private dtoToMikrotikKeys(dto: UpdateBgpConnectionDto) {
    return {
      name: dto.name,
      listen: dto.listen,
      connect: dto.connect,
      "local.address": dto.localAddress,
      "local.port": dto.localPort,
      "local.role": dto.localRole,
      "local.ttl": dto.localTtl,
      "remote.address": dto.remoteAddress,
      "remote.port": dto.remotePort,
      "remote.as": dto.remoteAs,
      "remote.allow-as": dto.allowedAs,
      "remote.ttl": dto.remoteTtl,
      "tcp-md5-key": dto.tcpMd5Key,
      templates: dto.templates,
    };
  }
}
