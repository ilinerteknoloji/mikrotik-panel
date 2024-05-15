import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRepository } from "./users.repository";
import { UserRole } from "src/lib/enums/user-role.enum";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll(
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

  findById(id: number) {
    return `This action returns a #${id} user`;
  }

  findByUsername(username: string) {
    return `This action returns a #${username} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);

    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
