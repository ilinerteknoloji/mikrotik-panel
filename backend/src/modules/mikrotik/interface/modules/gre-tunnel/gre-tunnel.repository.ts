import { HttpException, Injectable } from "@nestjs/common";
import { EnvService } from "src/shared/env/env.service";
import { CreateGreTunnelDto } from "./dto/create-gre-tunnel.dto";

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
    console.log("createGreTunnelDto", createGreTunnelDto);

    const createResponse = await fetch(`${this.host}/rest/interface/gre/add`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        this.createGreTunnelToMikrotikJson(createGreTunnelDto),
      ),
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

  private createGreTunnelToMikrotikJson(
    createGreTunnelDto: CreateGreTunnelDto,
  ) {
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
}
