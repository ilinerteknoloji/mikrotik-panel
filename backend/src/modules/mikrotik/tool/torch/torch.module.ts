import { Module } from "@nestjs/common";
import { TorchService } from "./torch.service";
import { TorchController } from "./torch.controller";
import { TorchRepository } from "./torch.repository";
import { InterfaceModule } from "../../interface/interface.module";

@Module({
  imports: [InterfaceModule],
  controllers: [TorchController],
  providers: [TorchService, TorchRepository],
})
export class TorchModule {}
