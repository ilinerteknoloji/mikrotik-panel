import { PartialType } from '@nestjs/mapped-types';
import { CreateIpTunnelDto } from './create-ip-tunnel.dto';

export class UpdateIpTunnelDto extends PartialType(CreateIpTunnelDto) {}
