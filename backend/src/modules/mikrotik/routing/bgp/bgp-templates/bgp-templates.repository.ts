import { HttpException, Injectable } from "@nestjs/common";
import { EnvService } from "src/shared/env/env.service";
import { CreateBgpTemplateDto } from "./dto/create-bgp-template.dto";
import { UpdateBgpTemplateDto } from "./dto/update-bgp-template.dto";

@Injectable()
export class BgpTemplatesRepository {
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

  public async create(createBgpTemplateDto: CreateBgpTemplateDto) {
    const response = await fetch(`${this.host}/rest/routing/bgp/template/add`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.dtoToMikrotik(createBgpTemplateDto)),
    });
    const json = await response.json();
    // console.log(this.dtoToMikrotik(createBgpTemplateDto));
    // console.log(JSON.stringify(this.dtoToMikrotik(createBgpTemplateDto)));
    // console.log(json);

    if (!response.ok)
      throw new HttpException(
        json?.detail ?? response.statusText,
        response.status,
      );
    return json;
  }

  public async findAll() {
    const response = await fetch(`${this.host}/rest/routing/bgp/template`, {
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
      `${this.host}/rest/routing/bgp/template/${id}`,
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

  dtoToMikrotik(dto: UpdateBgpTemplateDto) {
    return {
      "add-path-out": dto.addPathOut,
      "address-families": dto.addressFamilies,
      as: dto.as,
      "as-override": dto.asOverride,
      "cisco-vpls-nlri-len-fmt": dto.ciscoVplsNlriLenFmt,
      "cluster-id": dto.clusterId,
      disabled: dto.disabled,
      "hold-time": dto.holdTime,
      "input.accept-communities": dto.acceptCommunities,
      "input.accept-ext-communities": dto.acceptExtCommunities,
      "input.accept-large-communities": dto.acceptLargeCommunities,
      "input.accept-nlri": dto.acceptNlri,
      "input.accept-unknown": dto.acceptUnknown,
      "input.affinity": dto.affinity,
      "input.allow-as": dto.allowAs,
      "input.filter": dto.filter,
      "input.ignore-as-path-len": dto.ignoreAsPathLen,
      "input.limit-nlri-diversity": dto.limitNlriDiversity,
      "input.limit-process-routes-ipv4": dto.limitProcessRoutesIpv4,
      "input.limit-process-routes-ipv6": dto.limitProcessRoutesIpv6,
      "keepalive-time": dto.keepaliveTime,
      multihop: dto.multihop,
      name: dto.name,
      "nexthop-choice": dto.nexthopChoice,
      "output.affinity": dto.outputAffinity,
      "output.default-originate": dto.defaultOriginate,
      "output.default-prepend": dto.defaultPrepend,
      "output.filter-chain": dto.filterChain,
      "output.filter-select": dto.filterSelect,
      "output.keep-sent-attributes": dto.keepSentAttributes,
      "output.network": dto.network,
      "output.no-client-to-client-reflection": dto.noClientToClientReflection,
      "output.no-early-cut": dto.noEarlyCut,
      "output.redistribute": dto.redistribute,
      "remove-private-as": dto.removePrivateAs,
      "router-id": dto.routerId,
      "routing-table": dto.routingTable,
      "save-to": dto.saveTo,
      templates: dto.templates,
      "use-bfd": dto.useBfd,
      vrf: dto.vrf,
    };
  }
}
