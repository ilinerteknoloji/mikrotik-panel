import { PartialType } from '@nestjs/mapped-types';
import { CreateBgpConnectionDto } from './create-bgp-connection.dto';

export class UpdateBgpConnectionDto extends PartialType(CreateBgpConnectionDto) {}
