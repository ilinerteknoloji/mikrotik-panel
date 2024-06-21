import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EnvService } from "src/shared/env/env.service";
import { interfaceSchema } from "src/types/zod-schemas/mikrotik/interface/interface.schema";
import { z } from "zod";

@Injectable()
export class InterfaceRepository {
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

  public async fetchAll() {
    const interfacesResponse = await fetch(`${this.host}/rest/interface`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${this.auth}`,
      },
    });
    if (!interfacesResponse.ok)
      throw new InternalServerErrorException("Failed to fetch interfaces");
    const interfacesJson = await interfacesResponse.json();
    const parsedInterfaces = z.array(interfaceSchema).safeParse(interfacesJson);
    if (!parsedInterfaces.success)
      throw new InternalServerErrorException("Failed to fetch interfaces");
    return parsedInterfaces.data;
  }
}
