import { HttpException, Injectable } from "@nestjs/common";
import { EnvService } from "src/shared/env/env.service";
import { CreateBridgeDto } from "./dto/create-bridge.dto";

@Injectable()
export class BridgeRepository {
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

  public async create(createBridgeDto: CreateBridgeDto) {
    const createResponse = await fetch(
      `${this.host}/rest/interface/bridge/add`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${this.auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          this.createBridgeToToMikrotikJson(createBridgeDto),
        ),
      },
    );
    const createJson = await createResponse.json();
    if (!createResponse.ok)
      throw new HttpException(
        createJson?.detail ?? createResponse.statusText,
        createResponse.status,
      );
    return createJson;
  }

  private createBridgeToToMikrotikJson(createBridgeDto: CreateBridgeDto) {
    return {
      "add-dhcp-option82": createBridgeDto.addDhcpOption82,
      "admin-mac": createBridgeDto.adminMac,
      "ageing-time": createBridgeDto.ageingTime,
      arp: createBridgeDto.arp,
      "arp-timeout": createBridgeDto.arpTimeout,
      "auto-mac": createBridgeDto.autoMac,
      comment: createBridgeDto.comment,
      "dhcp-snooping": createBridgeDto.dhcpSnooping,
      disabled: createBridgeDto.disabled,
      "ether-type": createBridgeDto.etherType,
      "fast-forward": createBridgeDto.fastForward,
      "forward-delay": createBridgeDto.forwardDelay,
      "frame-types": createBridgeDto.frameTypes,
      "igmp-snooping": createBridgeDto.igmpSnooping,
      "igmp-version": createBridgeDto.igmpVersion,
      "ingress-filtering": createBridgeDto.ingressFiltering,
      // l2mtu: "", // string (read-only)
      "last-member-interval": createBridgeDto.lastMemberInterval,
      "last-member-query-count": createBridgeDto.lastMemberQueryCount,
      "max-hops": createBridgeDto.maxHops,
      "max-message-age": createBridgeDto.maxMessageAge,
      "membership-interval": createBridgeDto.membershipInterval,
      "mld-version": createBridgeDto.mldVersion,
      mtu: createBridgeDto.mtu,
      "multicast-querier": createBridgeDto.multicastQuerier,
      "multicast-router": createBridgeDto.multicastRouter,
      name: createBridgeDto.name,
      priority: createBridgeDto.priority,
      "protocol-mode": createBridgeDto.protocolMode,
      pvid: createBridgeDto.pvid,
      "querier-interval": createBridgeDto.querierInterval,
      "query-interval": createBridgeDto.queryInterval,
      "query-response-interval": createBridgeDto.queryResponseInterval,
      "region-name": createBridgeDto.regionName,
      "region-revision": createBridgeDto.regionRevision,
      "startup-query-count": createBridgeDto.startupQueryCount,
      "startup-query-interval": createBridgeDto.startupQueryInterval,
      "transmit-hold-count": createBridgeDto.transmitHoldCount,
      "vlan-filtering": createBridgeDto.vlanFiltering,
    };
  }
}
