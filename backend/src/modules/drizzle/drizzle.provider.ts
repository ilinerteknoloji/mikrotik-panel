import { Provider } from "@nestjs/common";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2";
import { DRIZZLE_PROVIDER } from "src/lib/constants";
import { EnvService } from "src/lib/utils/env/env.service";
import * as schema from "src/modules/drizzle/schemas";

export const drizzleProvider: Provider = {
  provide: DRIZZLE_PROVIDER,
  inject: [EnvService],
  useFactory: async (config: EnvService) => {
    const user = config.get("DATABASE_USER");
    const password = config.get("DATABASE_PASSWORD");
    const database = config.get("DATABASE_NAME");
    const host = config.get("DATABASE_HOST");
    const port = +config.get("DATABASE_PORT");

    const pool = createPool({
      user,
      password,
      database,
      host,
      port,
      connectionLimit: 20,
    });

    return drizzle(pool, {
      mode: "default",
      schema,
    });
  },
};
