import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { TorchService } from "./torch.service";
import { CreateTorchDto } from "./dto/create-torch.dto";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";

@Controller("torch")
@UseGuards(AuthGuard)
export class TorchController {
  constructor(private readonly torchService: TorchService) {}

  // TODO: Role Guard
  @Post()
  public create(@Body() createTorchDto: CreateTorchDto) {
    return this.torchService.create(createTorchDto);
  }

  // @Get()
  // public findAll() {
  //   return this.torchService.findAll();
  // }

  // @Get(":id")
  // public findOne(@Param("id") id: string) {
  //   return this.torchService.findOne(+id);
  // }

  // @Patch(":id")
  // public update(@Param("id") id: string, @Body() updateTorchDto: UpdateTorchDto) {
  //   return this.torchService.update(+id, updateTorchDto);
  // }

  // @Delete(":id")
  // public remove(@Param("id") id: string) {
  //   return this.torchService.remove(+id);
  // }
}
