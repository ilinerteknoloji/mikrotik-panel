import { HttpException, Injectable } from "@nestjs/common";
import { EnvService } from "src/shared/env/env.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Injectable()
export class AddressesRepository {
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

  public async create(createAddressDto: CreateAddressDto) {
    const response = await fetch(`${this.host}/rest/ip/address/add`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.dtoToMikrotik(createAddressDto)),
    });
    const json = await response.json();
    // console.log(this.dtoToMikrotik(createAddressDto));
    // console.log(JSON.stringify(this.dtoToMikrotik(createAddressDto)));
    // console.log(json);

    if (!response.ok)
      throw new HttpException(
        json?.detail ?? response.statusText,
        response.status,
      );
    return json;
  }

  public async findAll() {
    const response = await fetch(`${this.host}/rest/ip/address`, {
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
    const response = await fetch(`${this.host}/rest/ip/address/${id}`, {
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

  public async update(id: string, dto: UpdateAddressDto) {
    const response = await fetch(`${this.host}/rest/ip/address/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.dtoToMikrotik(dto)),
    });
    const json = await response.json();
    if (!response.ok)
      throw new HttpException(
        json?.detail ?? response.statusText,
        response.status,
      );
    return json;
  }

  private dtoToMikrotik(dto: UpdateAddressDto) {
    return {
      address: dto.address,
      //   advertise: dto.advertise,
      comment: dto.comment,
      disabled: dto.disabled,
      //   "eui-64": dto.eui64,
      //   "from-pool": dto.fromPool,
      interface: dto.interface,
      //   "no-dad": dto.noDad,
    };
  }
}
