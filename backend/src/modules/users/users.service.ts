import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRole } from "src/lib/enums/user-role.enum";
import { filterUsersPublicInformations } from "src/lib/utils";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRepository } from "./users.repository";
import { UsersSchemaType } from "src/shared/drizzle/schemas";
import { OrderByPipeType, RequestUserType } from "src/types";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { EncryptionService } from "src/shared/encryption/encryption.service";
import { UpdateUserFromAdmin } from "./dto/update-user-from-admin.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

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

  public async findById(id: number, user: RequestUserType) {
    const [{ users, user_details }] =
      await this.usersRepository.findUserByKeyWithDetail("id", id);
    return {
      ...filterUsersPublicInformations(users, user.role === UserRole.ADMIN),
      user_details,
    };
  }

  public async findByUsername(username: string, user: RequestUserType) {
    const [{ users, user_details }] =
      await this.usersRepository.findUserByKeyWithDetail("username", username);
    return {
      ...filterUsersPublicInformations(users, user.role === UserRole.ADMIN),
      details: user_details,
    };
  }

  public async findAllUsername() {
    return this.usersRepository.findAllUsername();
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    const response = await this.usersRepository.updateUser(
      "id",
      id,
      updateUserDto,
    );
    if (response[0].affectedRows === 0) {
      throw new NotFoundException("User not found");
    }
    const newData = await this.usersRepository.findUserByKey("id", id);
    return filterUsersPublicInformations(newData[0]);
  }

  public async updatePassword(
    id: number,
    updatePasswordDto: UpdatePasswordDto,
  ) {
    const [user] = await this.usersRepository.findUserByKey("id", id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const isMatch = await this.encryptionService.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );
    if (!isMatch) {
      throw new NotFoundException("Password not match");
    }
    const encryptedPassword = await this.encryptionService.encrypt(
      updatePasswordDto.newPassword,
    );
    const response = await this.usersRepository.updateUser("id", id, {
      password: encryptedPassword,
    });
    if (response[0].affectedRows === 0) {
      throw new NotFoundException("User not found");
    }
    const newData = await this.usersRepository.findUserByKey("id", id);
    return filterUsersPublicInformations(newData[0]);
  }

  public async updateUserFromAdmin(id: number, newData: UpdateUserFromAdmin) {
    const response = await this.usersRepository.updateUser("id", id, newData);
    if (response[0].affectedRows === 0) {
      throw new NotFoundException("User not found");
    }
    const updatedData = await this.usersRepository.findUserByKey("id", id);
    return filterUsersPublicInformations(updatedData[0]);
  }

  public async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
