import { PartialType } from '@nestjs/mapped-types';
import { CreateArpDto } from './create-arp.dto';

export class UpdateArpDto extends PartialType(CreateArpDto) {}
