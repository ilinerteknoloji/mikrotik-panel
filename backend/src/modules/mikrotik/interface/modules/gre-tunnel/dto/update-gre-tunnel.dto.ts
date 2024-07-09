import { PartialType } from '@nestjs/mapped-types';
import { CreateGreTunnelDto } from './create-gre-tunnel.dto';

export class UpdateGreTunnelDto extends PartialType(CreateGreTunnelDto) {}
