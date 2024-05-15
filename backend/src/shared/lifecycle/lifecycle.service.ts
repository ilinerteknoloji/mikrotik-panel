import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from "@nestjs/common";
import { GenerateKeysService } from "../keys/generate-keys.service";

@Injectable()
export class LifecycleService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(private readonly keys: GenerateKeysService) {}

  onApplicationBootstrap() {
    this.keys.generateKeys();
  }

  onApplicationShutdown(signal?: string) {
    // TODO: this.keys.deleteKeys();
  }
}
