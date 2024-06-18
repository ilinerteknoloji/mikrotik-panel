import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRepository } from "./users.repository";
import { UserRole } from "src/lib/enums/user-role.enum";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async findAll(
    page: number,
    limit: number,
    search: string,
    role: UserRole | undefined,
    status: boolean | undefined,
  ) {
    const users = this.usersRepository.findUsers(
      page,
      limit,
      search,
      role,
      status,
    );
    return users;
  }

  public async findById(id: number) {
    return `This action returns a #${id} user`;
  }

  public async findByUsername(username: string) {
    return `This action returns a #${username} user`;
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);

    return `This action updates a #${id} user`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
