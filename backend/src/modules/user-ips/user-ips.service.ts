import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { OrderByPipeType, RequestUserType } from "src/types";
import { AddressListsService } from "../mikrotik/ip/firewall/address-lists/address-lists.service";
import { UsersRepository } from "../users/users.repository";
import { CreateUserIpDto } from "./dto/create-user-ip.dto";
import { UpdateUserIpDto } from "./dto/update-user-ip.dto";
import { UserIpsRepository } from "./user-ips.repository";
import { MikrotikUserIpsSchemaType } from "src/shared/drizzle/schemas";

@Injectable()
export class UserIpsService {
  constructor(
    private readonly userIpsRepository: UserIpsRepository,
    private readonly userRepository: UsersRepository,
    private readonly addressListService: AddressListsService,
  ) {}

  public async create(createIpDto: CreateUserIpDto) {
    await this.userRepository.findUserByKey("id", createIpDto.userId);
    const created = [];
    const errors: string[] = [];
    for (let i = 0; i < createIpDto.ips.length; i++) {
      const ip = createIpDto.ips[i];
      const isExist = await this.userIpsRepository.findByKeyOnlyActiveWithUser(
        "ip",
        ip,
      );
      if (isExist !== undefined) {
        errors.push(`IP ${ip} already used by ${isExist.user.username}.`);
      } else {
        const response = await this.userIpsRepository.create(
          ip,
          createIpDto.userId,
        );
        if (response !== undefined) {
          created.push(response);
          const addressList =
            await this.addressListService.createAddressListWithDefault(ip);
          if (!addressList) {
            errors.push(`Failed to create address list for IP ${ip}.`);
          } else if (typeof addressList === "string") {
            errors.push(addressList);
          }
        } else {
          errors.push(`Failed to create IP ${ip}.`);
        }
      }
    }
    return {
      created,
      errors,
    };
  }

  public async findAll(
    page: number,
    limit: number,
    status: boolean,
    search: string,
    isDashboardPage: boolean,
    orderBy: OrderByPipeType<MikrotikUserIpsSchemaType>,
    user: RequestUserType,
  ) {
    if (isDashboardPage)
      return this.userIpsRepository.findAll(
        page,
        limit,
        status,
        search,
        orderBy,
      );
    return this.userIpsRepository.findAllByUserId(
      page,
      limit,
      status,
      search,
      orderBy,
      user.id,
    );
  }

  public async findOne(id: number) {
    return this.userIpsRepository.findOneById(id);
  }

  public async update(id: number, updateUserIpDto: UpdateUserIpDto) {
    const ip = await this.userIpsRepository.findOneById(id);
    if (ip === undefined) throw new NotFoundException(`IP not found.`);
    if (!updateUserIpDto.status) {
      return this.userIpsRepository.update(id, updateUserIpDto);
    }
    const isActive = await this.userIpsRepository.findByKeyOnlyActiveWithUser(
      "ip",
      ip.ip,
    );
    if (isActive !== undefined && isActive.id !== id) {
      throw new ConflictException(
        `IP ${ip.ip} already used by ${isActive.user.username}.`,
      );
    }
    return this.userIpsRepository.update(id, updateUserIpDto);
  }

  // public async remove(id: number) {
  //   return `This action removes a #${id} ip`;
  // }
}
