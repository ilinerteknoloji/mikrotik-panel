import { PartialType } from "@nestjs/mapped-types";
import { CreateTorchDto } from "./create-torch.dto";

export class UpdateTorchDto extends PartialType(CreateTorchDto) {}
