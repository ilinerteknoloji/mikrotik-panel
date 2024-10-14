import { HttpException, Injectable } from "@nestjs/common";
import { EnvService } from "src/shared/env/env.service";
import { CreateIpTunnelDto } from "./dto/create-ip-tunnel.dto";
import { UpdateIpTunnelDto } from "./dto/update-ip-tunnel.dto";

@Injectable()
export class IpTunnelRepository {
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

  public async create(createIpTunnelDto: CreateIpTunnelDto) {
    const createResponse = await fetch(`${this.host}/rest/interface/ipip/add`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.jsonToMikrotik(createIpTunnelDto)),
    });
    const createJson = await createResponse.json();
    if (!createResponse.ok)
      throw new HttpException(
        createJson?.detail ?? createResponse.statusText,
        createResponse.status,
      );
    return createJson;
  }

  public async findOne(id: string) {
    const response = await fetch(`${this.host}/rest/interface/ipip/${id}`, {
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok)
      throw new HttpException(
        json?.detail ?? response.statusText,
        response.status,
      );
    return this.miktorikToJson(json);
  }

  public async update(id: string, dto: UpdateIpTunnelDto) {
    const response = await fetch(`${this.host}/rest/interface/ipip/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.jsonToMikrotik(dto)),
    });
    const json = await response.json();
    if (!response.ok)
      throw new HttpException(
        json?.detail ?? response.statusText,
        response.status,
      );
    return json;
  }

  private jsonToMikrotik(createIpTunnelDto: UpdateIpTunnelDto) {
    return {
      "clamp-tcp-mss": createIpTunnelDto.clampTcpMss,
      comment: createIpTunnelDto.comment,
      disabled: createIpTunnelDto.disabled,
      "dont-fragment": createIpTunnelDto.dontFragment,
      dscp: createIpTunnelDto.dscp,
      "ipsec-secret": createIpTunnelDto.ipsecSecret,
      "local-address": createIpTunnelDto.localAddress,
      mtu: createIpTunnelDto.mtu,
      keepalive: createIpTunnelDto.keepalive,
      name: createIpTunnelDto.name,
      "remote-address": createIpTunnelDto.remoteAddress,
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
      localAddress: json["local-address"],
      mtu: json.mtu,
      keepalive: json.keepalive,
      name: json.name,
      remoteAddress: json["remote-address"],
    };
  }
}
