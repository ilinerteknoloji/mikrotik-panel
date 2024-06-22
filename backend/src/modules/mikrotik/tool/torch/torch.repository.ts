import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EnvService } from "src/shared/env/env.service";
import { CreateTorchDto } from "./dto/create-torch.dto";
import { z } from "zod";
import { torchSchema } from "src/types/zod-schemas/mikrotik/tool/torch/torch.schema";

@Injectable()
export class TorchRepository {
  private readonly host: string;
  private readonly username: string;
  private readonly password: string;
  private readonly auth: string;

  constructor(private readonly env: EnvService) {
    this.host = this.env.get("MIKROTIK_HOST");
    this.username = this.env.get("MIKROTIK_USERNAME");
    this.password = this.env.get("MIKROTIK_PASSWORD");
    this.auth = btoa(`${this.username}:${this.password}`);
  }

  public async create({
    interface: interfaceName,
    duration,
    srcAddress,
    dstAddress,
  }: CreateTorchDto) {
    const torchResponse = await fetch(`${this.host}/rest/tool/torch`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        interface: interfaceName,
        duration: duration,
        "src-address": srcAddress,
        "dst-address": dstAddress,
      }),
    });
    const torchJson = await torchResponse.json();
    if (!torchResponse.ok)
      throw new InternalServerErrorException("Failed to create torch");
    const parsedTorch = z.array(torchSchema).safeParse(torchJson);
    if (!parsedTorch.success)
      throw new InternalServerErrorException("Failed to parse torch response");
    return parsedTorch.data;
  }
}
