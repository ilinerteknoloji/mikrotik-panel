import { ConflictException, Injectable } from "@nestjs/common";
import { CreateIpCategoryDto } from "./dto/create-ip-category.dto";
import { UpdateIpCategoryDto } from "./dto/update-ip-category.dto";
import { IpCategoriesRepository } from "./ip-categories.repository";

@Injectable()
export class IpCategoriesService {
  constructor(
    private readonly ipCategoriesRepository: IpCategoriesRepository,
  ) {}

  async create(createIpCategoryDto: CreateIpCategoryDto) {
    const isExist = await this.ipCategoriesRepository.findByKey(
      "title",
      createIpCategoryDto.title,
    );
    if (isExist.length > 0) {
      throw new ConflictException(
        `${createIpCategoryDto.title} already exist.`,
      );
    }
    return this.ipCategoriesRepository.create(createIpCategoryDto);
  }

  findAll() {
    return this.ipCategoriesRepository.findByKey("status", true);
  }

  findOne(id: number) {
    return this.ipCategoriesRepository.findByKey("id", id);
  }

  async update(id: number, updateIpCategoryDto: UpdateIpCategoryDto) {
    return this.ipCategoriesRepository.update(id, updateIpCategoryDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} ipCategory`;
  // }
}
