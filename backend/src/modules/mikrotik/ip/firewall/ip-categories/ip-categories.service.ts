import { ConflictException, Injectable } from "@nestjs/common";
import { CreateIpCategoryDto } from "./dto/create-ip-category.dto";
import { UpdateIpCategoryDto } from "./dto/update-ip-category.dto";
import { IpCategoriesRepository } from "./ip-categories.repository";

@Injectable()
export class IpCategoriesService {
  constructor(
    private readonly ipCategoriesRepository: IpCategoriesRepository,
  ) {}

  public async create(createIpCategoryDto: CreateIpCategoryDto) {
    const { title } = createIpCategoryDto;
    const isExist = await this.ipCategoriesRepository.findByKey("title", title);
    if (isExist.length > 0)
      throw new ConflictException(`${title} already exist.`);
    const [{ insertId }] =
      await this.ipCategoriesRepository.create(createIpCategoryDto);
    return await this.ipCategoriesRepository.findByKey("id", insertId);
  }

  public async findAll() {
    return await this.ipCategoriesRepository.findByKey("status", true);
  }

  public async findOne(id: number) {
    return await this.ipCategoriesRepository.findByKey("id", id);
  }

  public async update(id: number, updateIpCategoryDto: UpdateIpCategoryDto) {
    return await this.ipCategoriesRepository.update(id, updateIpCategoryDto);
  }

  // remove(id: number) {
  //   return await `This action removes a #${id} ipCategory`;
  // }
}
