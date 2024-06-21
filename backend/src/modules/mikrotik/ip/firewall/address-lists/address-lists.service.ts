import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { filterUsersPublicInformations } from "src/lib/utils";
import { EnvService } from "src/shared/env/env.service";
import { RequestUserType } from "src/types";
import { z } from "zod";
import { IpCategoriesRepository } from "../ip-categories/ip-categories.repository";
import { AddressListsRepository } from "./address-lists.repository";
import { UpdateAddressListDto } from "./dto/update-address-list.dto";
import { UsersRepository } from "src/modules/users/users.repository";
import { addressListSchema } from "src/types/zod-schemas/mikrotik/ip/firewall/address-list.schema";

@Injectable()
export class AddressListsService {
  private readonly host: string;
  private readonly username: string;
  private readonly password: string;
  private readonly auth: string;

  constructor(
    private readonly env: EnvService,
    private readonly addressListsRepository: AddressListsRepository,
    private readonly ipCategoriesRepository: IpCategoriesRepository,
    private readonly userRepository: UsersRepository,
  ) {
    this.host = this.env.get("MIKROTIK_HOST");
    this.username = this.env.get("MIKROTIK_USERNAME");
    this.password = this.env.get("MIKROTIK_PASSWORD");
    this.auth = btoa(`${this.username}:${this.password}`);
  }

  public async createAddressListWithDefault(
    ip: string,
  ): Promise<boolean | string> {
    const isActiveAddressList =
      await this.addressListsRepository.findByIpOnlyActive(ip);
    const list = await this.ipCategoriesRepository.findByKey("id", 1);
    const addressLists = await fetch(
      `${this.host}/rest/ip/firewall/address-list`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${this.auth}`,
          "Content-Type": "application/json",
        },
      },
    );
    const allLists = await addressLists.json();
    const parsedAddressList = z.array(addressListSchema).safeParse(allLists);
    if (!parsedAddressList.success) return parsedAddressList.error.message;
    const isActive = parsedAddressList.data.find(
      (parsedAddress) => parsedAddress.address === ip,
    );
    let createdIp: Response;
    if (isActive) {
      createdIp = await fetch(
        `${this.host}/rest/ip/firewall/address-list/${isActive[".id"]}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Basic ${this.auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            list: list[0].title,
            address: isActiveAddressList.ip,
          }),
        },
      );
    } else {
      createdIp = await fetch(
        `${this.host}/rest/ip/firewall/address-list/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${this.auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            list: list[0].title,
            address: isActiveAddressList.ip,
          }),
        },
      );
    }
    const createdAddressList = await createdIp.json();
    if (!createdIp.ok) return createdIp.statusText;
    const addressList = await this.addressListsRepository.create({
      address: isActiveAddressList.id,
      list: 1,
      mikrotikId: isActive ? isActive[".id"] : createdAddressList.ret,
    });
    return addressList[0].insertId > 0 ? true : false;
  }

  public async findAll(user: RequestUserType) {
    if (user.role === "admin") {
      return this.addressListsRepository.findAllActive();
    }
    return this.addressListsRepository.findAllActiveByUserId(user.id);
  }

  public async findOne(mikrotikUserIpsId: number, user: RequestUserType) {
    const addressListData = await this.addressListsRepository.findById(
      "address",
      mikrotikUserIpsId,
    );
    if (
      !addressListData ||
      !addressListData.address.status ||
      (addressListData.address.userId !== user.id && user.role !== "admin")
    ) {
      throw new NotFoundException("Address list not found");
    }

    const response = await fetch(
      `${this.host}/rest/ip/firewall/address-list/${addressListData.mikrotikId}`,
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
    if (user.role !== "admin") {
      return {
        addressList,
        ip: addressListData.address,
        category: addressListData.ipCategory,
      };
    }

    const userInfo = await this.userRepository.findUserByKey(
      "id",
      addressListData.address.userId,
    );
    const publicUser = filterUsersPublicInformations(userInfo[0]);
    return {
      addressList,
      ip: addressListData.address,
      category: addressListData.ipCategory,
      user: publicUser,
    };
  }

  async update(
    updateAddressListDto: UpdateAddressListDto,
    user: RequestUserType,
  ) {
    const { ip, list } = updateAddressListDto;
    const userIps =
      await this.addressListsRepository.findByIpWithAddressListAndUser(ip);
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
      `${this.host}/rest/ip/firewall/address-list/${userIps.addressList[0].mikrotikId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Basic ${this.auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: userIps.ip,
          list: list,
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
    const updatedAddressListData = await this.addressListsRepository.update(
      userIps.addressList[0].id,
      {
        list: isValidCategory[0].id,
      },
    );

    if (!updatedAddressListData)
      throw new InternalServerErrorException("Address list not updated");

    return { updatedAddressList };
  }

  remove(id: number) {
    // TODO: Implement this method
    return `This action removes a #${id} addressList`;
  }
}
