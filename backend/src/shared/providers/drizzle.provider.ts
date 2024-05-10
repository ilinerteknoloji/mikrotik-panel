import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2";
import * as schema from "src/drizzle/schemas";
import { DRIZZLE_PROVIDER } from "../constants";

export const drizzleProvider: Provider = {
  provide: DRIZZLE_PROVIDER,
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const { USER, PASSWORD, NAME, HOST, PORT } = config.getOrThrow("DATABASE");
    const pool = createPool({
      user: USER,
      password: PASSWORD,
      database: NAME,
      host: HOST,
      port: PORT,
      connectionLimit: 20,
    });

    return drizzle(pool, {
      mode: "default",
      schema,
    });
  },
};
