import { Injectable } from "@nestjs/common";
import { UserRole } from "src/lib/enums/user-role.enum";
import { filterUsersPublicInformations } from "src/lib/utils";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRepository } from "./users.repository";
import { UsersSchemaType } from "src/shared/drizzle/schemas";
import { OrderByPipeType } from "src/types";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public findAll(
    page: number,
    limit: number,
    search: string,
    role: UserRole | undefined,
    status: boolean | undefined,
    orderBy: OrderByPipeType<UsersSchemaType>,
  ) {
    return this.usersRepository.findUsers(
      page,
      limit,
      search,
      role,
      status,
      orderBy,
    );
  }

  public allUsersCount() {
    return this.usersRepository.allUsersCount();
  }

  public async findById(id: number) {
    const [{ users, user_details }] =
      await this.usersRepository.findUserByKeyWithDetail("id", id);
    return {
      ...filterUsersPublicInformations(users),
      user_details,
    };
  }

  public async findByUsername(username: string) {
    const [{ users, user_details }] =
      await this.usersRepository.findUserByKeyWithDetail("username", username);
    return {
      ...filterUsersPublicInformations(users),
      details: user_details,
    };
  }

  public async findAllUsername() {
    return this.usersRepository.findAllUsername();
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);

    return `This action updates a #${id} user`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
