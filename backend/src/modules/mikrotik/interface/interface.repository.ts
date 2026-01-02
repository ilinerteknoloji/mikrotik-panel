import { HttpException, Injectable } from "@nestjs/common";
import { EnvService } from "src/shared/env/env.service";

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

  public async fetchById(id: string) {
    const interfacesResponse = await fetch(
      `${this.host}/rest/interface/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${this.auth}`,
        },
      },
    );
    const interfacesJson = await interfacesResponse.json();
    if (!interfacesResponse.ok)
      throw new HttpException(
        interfacesJson?.detail ?? interfacesResponse.statusText,
        interfacesResponse.status,
      );
    return interfacesJson;
  }

  public async fetchAll() {
    const interfacesResponse = await fetch(`${this.host}/rest/interface`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${this.auth}`,
      },
    });
    const interfacesJson = await interfacesResponse.json();
    if (!interfacesResponse.ok)
      throw new HttpException(
        interfacesJson?.detail ?? interfacesResponse.statusText,
        interfacesResponse.status,
      );
    return Array.isArray(interfacesJson) ? interfacesJson : [interfacesJson];
  }
}
