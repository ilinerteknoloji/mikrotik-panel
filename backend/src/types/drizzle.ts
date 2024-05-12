import { MySql2Database } from "drizzle-orm/mysql2";
import * as schemas from "src/shared/drizzle/schemas";

export type Drizzle = MySql2Database<typeof schemas>;
