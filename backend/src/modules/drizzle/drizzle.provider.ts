import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2";
import { DRIZZLE_PROVIDER } from "src/lib/constants";
import * as schema from "src/modules/drizzle/schemas";

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
