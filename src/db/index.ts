import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";

declare global {
    var pgPool: Pool | undefined;
}

const pool = globalThis.pgPool ?? new Pool({
    connectionString: process.env.DATABASE_URL,
});

if (process.env.NODE_ENV !== "production") {
    globalThis.pgPool = pool;
}

export const db = drizzle(pool, { schema, logger: true });