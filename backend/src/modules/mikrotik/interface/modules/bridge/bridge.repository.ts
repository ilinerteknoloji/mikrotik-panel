import { HttpException, Injectable } from "@nestjs/common";
import { EnvService } from "src/shared/env/env.service";
import { CreateBridgeDto } from "./dto/create-bridge.dto";
import { UpdateBridgeDto } from "./dto/update-bridge.dto";

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

  public async update(id: string, updateBridgeDto: UpdateBridgeDto) {
    const response = await fetch(`${this.host}/rest/interface/bridge/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.createBridgeToToMikrotikJson(updateBridgeDto)),
    });
    const json = await response.json();
    if (!response.ok)
      throw new HttpException(
        json?.detail ?? response.statusText,
        response.status,
      );
    return json;
  }

  private createBridgeToToMikrotikJson(bridgeDto: UpdateBridgeDto) {
    return {
      "add-dhcp-option82": bridgeDto.addDhcpOption82,
      "admin-mac": bridgeDto.adminMac,
      "ageing-time": bridgeDto.ageingTime,
      arp: bridgeDto.arp,
      "arp-timeout": bridgeDto.arpTimeout,
      "auto-mac": bridgeDto.autoMac,
      comment: bridgeDto.comment,
      "dhcp-snooping": bridgeDto.dhcpSnooping,
      disabled: bridgeDto.disabled,
      "ether-type": bridgeDto.etherType,
      "fast-forward": bridgeDto.fastForward,
      "forward-delay": bridgeDto.forwardDelay,
      "frame-types": bridgeDto.frameTypes,
      "igmp-snooping": bridgeDto.igmpSnooping,
      "igmp-version": bridgeDto.igmpVersion,
      "ingress-filtering": bridgeDto.ingressFiltering,
      // l2mtu: "", // string (read-only)
      "last-member-interval": bridgeDto.lastMemberInterval,
      "last-member-query-count": bridgeDto.lastMemberQueryCount,
      "max-hops": bridgeDto.maxHops,
      "max-message-age": bridgeDto.maxMessageAge,
      "membership-interval": bridgeDto.membershipInterval,
      "mld-version": bridgeDto.mldVersion,
      mtu: bridgeDto.mtu,
      "multicast-querier": bridgeDto.multicastQuerier,
      "multicast-router": bridgeDto.multicastRouter,
      name: bridgeDto.name,
      priority: bridgeDto.priority,
      "protocol-mode": bridgeDto.protocolMode,
      pvid: bridgeDto.pvid,
      "querier-interval": bridgeDto.querierInterval,
      "query-interval": bridgeDto.queryInterval,
      "query-response-interval": bridgeDto.queryResponseInterval,
      "region-name": bridgeDto.regionName,
      "region-revision": bridgeDto.regionRevision,
      "startup-query-count": bridgeDto.startupQueryCount,
      "startup-query-interval": bridgeDto.startupQueryInterval,
      "transmit-hold-count": bridgeDto.transmitHoldCount,
      "vlan-filtering": bridgeDto.vlanFiltering,
    };
  }
}
