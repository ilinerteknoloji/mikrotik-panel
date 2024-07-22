import { HttpException, Injectable } from "@nestjs/common";
import { EnvService } from "src/shared/env/env.service";
import { CreateIpTunnelDto } from "./dto/create-ip-tunnel.dto";

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
      body: JSON.stringify(
        this.createIpTunnelToMikrotikJson(createIpTunnelDto),
      ),
    });
    const createJson = await createResponse.json();
    if (!createResponse.ok)
      throw new HttpException(
        createJson?.detail ?? createResponse.statusText,
        createResponse.status,
      );
    return createJson;
  }

  private createIpTunnelToMikrotikJson(createIpTunnelDto: CreateIpTunnelDto) {
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
}
