import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { UserIpsRepository } from "src/modules/user-ips/user-ips.repository";
import { EnvService } from "src/shared/env/env.service";
import { RequestUserType } from "src/types";
import { AddressListsRepository } from "./address-lists.repository";
import { CreateAddressListDto } from "./dto/create-address-list.dto";
import { UpdateAddressListDto } from "./dto/update-address-list.dto";
import { filterUsersPublicInformations } from "src/lib/utils";
import { IpCategoriesRepository } from "src/modules/ip-categories/ip-categories.repository";

@Injectable()
export class AddressListsService {
  private readonly host: string;
  private readonly username: string;
  private readonly password: string;
  private readonly auth: string;

  constructor(
    private readonly env: EnvService,
    private readonly addressListsRepository: AddressListsRepository,
    private readonly userIpsRepository: UserIpsRepository,
    private readonly ipCategoriesRepository: IpCategoriesRepository,
  ) {
    this.host = this.env.get("MIKROTIK_HOST");
    this.username = this.env.get("MIKROTIK_USERNAME");
    this.password = this.env.get("MIKROTIK_PASSWORD");
    this.auth = btoa(`${this.username}:${this.password}`);
  }

  create(createAddressListDto: CreateAddressListDto) {
    console.log(createAddressListDto);

    return "This action adds a new addressList";
  }

  findAll() {
    return `This action returns all addressLists`;
  }

  async findOne(id: string, user: RequestUserType) {
    const response = await fetch(
      `${this.host}/rest/ip/firewall/address-list/*${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${this.auth}`,
        },
      },
    );
    const addressList = await response.json();
    if (!response.ok) {
      throw new HttpException(
        { message: response.statusText, statusCode: response.status },
        response.status,
      );
    }
    const userIps = await this.userIpsRepository.findByKeyOnlyActiveWithUser(
      "ip",
      addressList.address,
    );
    if (!userIps && user.role !== "admin") {
      throw new NotFoundException("User IP not found");
    }

    const { id: userIpsId, ip, status, createdAt, updatedAt, userId } = userIps;
    const publicUser = filterUsersPublicInformations(userIps.user);
    return {
      addressList,
      ip: {
        userIpsId,
        ip,
        status,
        createdAt,
        updatedAt,
        userId,
      },
      user: publicUser,
    };
  }

  async update(
    id: string,
    updateAddressListDto: UpdateAddressListDto,
    user: RequestUserType,
  ) {
    const response = await fetch(
      `${this.host}/rest/ip/firewall/address-list/*${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${this.auth}`,
        },
      },
    );
    const addressList = await response.json();
    if (!response.ok) {
      throw new HttpException(
        { message: response.statusText, statusCode: response.status },
        response.status,
      );
    }
    const userIps = await this.userIpsRepository.findByKeyOnlyActiveWithUser(
      "ip",
      addressList.address,
    );
    if (!userIps && user.role !== "admin") {
      throw new NotFoundException("User IP not found");
    }
    const isValidCategory = await this.ipCategoriesRepository.findByKey(
      "title",
      updateAddressListDto.list,
    );
    if (isValidCategory.length === 0) {
      throw new NotFoundException("Category not found");
    }
    const updatedResponse = await fetch(
      `${this.host}/rest/ip/firewall/address-list/*${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Basic ${this.auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: userIps.ip,
          list: updateAddressListDto.list,
        }),
      },
    );
    const updatedAddressList = await updatedResponse.json();
    if (!updatedResponse.ok) {
      throw new HttpException(
        {
          message: updatedResponse.statusText,
          statusCode: updatedResponse.status,
        },
        updatedResponse.status,
      );
    }
    return { updatedAddressList };
  }

  remove(id: number) {
    return `This action removes a #${id} addressList`;
  }
}
