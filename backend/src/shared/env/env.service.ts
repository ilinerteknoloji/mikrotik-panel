import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {EnvSchemaType} from "./env.schema";

@Injectable()
export class EnvService {
  constructor(private readonly config: ConfigService<EnvSchemaType, true>) {}

  public get<T extends keyof EnvSchemaType>(key: T): string {
    return this.config.get(key, {infer: true});
  }
}
