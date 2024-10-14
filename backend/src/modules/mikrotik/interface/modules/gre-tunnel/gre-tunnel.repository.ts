import { HttpException, Injectable } from "@nestjs/common";
import { EnvService } from "src/shared/env/env.service";
import { CreateGreTunnelDto } from "./dto/create-gre-tunnel.dto";
import { UpdateGreTunnelDto } from "./dto/update-gre-tunnel.dto";

@Injectable()
export class GreTunnelRepository {
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

  public async create(createGreTunnelDto: CreateGreTunnelDto) {
    const createResponse = await fetch(`${this.host}/rest/interface/gre/add`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.jsonToMikrotik(createGreTunnelDto)),
    });
    const createJson = await createResponse.json();
    if (!createResponse.ok) {
      const message = createJson?.detail ?? createResponse.statusText;
      const statusCode = createResponse?.status ?? 500;
      throw new HttpException(
        { message, error: message, statusCode },
        statusCode,
      );
    }
    return createJson;
  }

  public async findOne(id: string) {
    const response = await fetch(`${this.host}/rest/interface/gre/${id}`, {
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      const message = json?.detail ?? response.statusText;
      const statusCode = response?.status ?? 500;
      throw new HttpException(
        { message, error: message, statusCode },
        statusCode,
      );
    }
    return this.miktorikToJson(json);
  }

  public async update(id: string, dto: UpdateGreTunnelDto) {
    const response = await fetch(`${this.host}/rest/interface/gre/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.jsonToMikrotik(dto)),
    });
    const json = await response.json();
    if (!response.ok) {
      const message = json?.detail ?? response.statusText;
      const statusCode = response?.status ?? 500;
      throw new HttpException(
        { message, error: message, statusCode },
        statusCode,
      );
    }
    return json;
  }

  private jsonToMikrotik(createGreTunnelDto: UpdateGreTunnelDto) {
    return {
      "clamp-tcp-mss": createGreTunnelDto.clampTcpMss,
      comment: createGreTunnelDto.comment,
      disabled: createGreTunnelDto.disabled,
      "dont-fragment": createGreTunnelDto.dontFragment,
      dscp: createGreTunnelDto.dscp,
      "ipsec-secret": createGreTunnelDto.ipsecSecret,
      keepalive: createGreTunnelDto.keepalive,
      l2mtu: createGreTunnelDto.l2mtu,
      "local-address": createGreTunnelDto.localAddress,
      mtu: createGreTunnelDto.mtu,
      name: createGreTunnelDto.name,
      "remote-address": createGreTunnelDto.remoteAddress,
    };
  }

  private miktorikToJson(json: any) {
    return {
      clampTcpMss: json["clamp-tcp-mss"],
      comment: json.comment,
      disabled: json.disabled,
      dontFragment: json["dont-fragment"],
      dscp: json.dscp,
      ipsecSecret: json["ipsec-secret"],
      keepalive: json.keepalive,
      l2mtu: json.l2mtu,
      localAddress: json["local-address"],
      mtu: json.mtu,
      name: json.name,
      remoteAddress: json["remote-address"],
    };
  }
}
