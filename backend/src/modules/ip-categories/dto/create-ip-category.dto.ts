import { Length } from "class-validator";

export class CreateIpCategoryDto {
  @Length(3, 100)
  title: string;
  @Length(3, 512)
  description: string;
}
