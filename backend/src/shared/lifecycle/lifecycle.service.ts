import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from "@nestjs/common";
import { GenerateKeysService } from "../keys/generate-keys.service";
import { IpCategoriesRepository } from "src/modules/mikrotik/ip/firewall/ip-categories/ip-categories.repository";

@Injectable()
export class LifecycleService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(
    private readonly keys: GenerateKeysService,
    private readonly ipCategoriesRepository: IpCategoriesRepository,
  ) {}

  private readonly logger = new Logger(LifecycleService.name);

  public async onApplicationBootstrap() {
    this.keys.generateKeys();
    await this.createDefaultIpCategories();
  }

  private async createDefaultIpCategories() {
    const isExist = await this.ipCategoriesRepository.findByKey(
      "title",
      "Default",
    );
    if (isExist.length === 0) {
      await this.ipCategoriesRepository.create({
        title: "Default",
        description: "Default category",
      });
      this.logger.log("Default IP categories created.");
    } else {
      this.logger.warn("Default IP categories already exist.");
    }
  }
  public async onApplicationShutdown(signal?: string) {
    // TODO: this.keys.deleteKeys();
  }
}
