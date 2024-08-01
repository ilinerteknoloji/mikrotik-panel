import { PartialType } from '@nestjs/mapped-types';
import { CreateBgpTemplateDto } from './create-bgp-template.dto';

export class UpdateBgpTemplateDto extends PartialType(CreateBgpTemplateDto) {}
