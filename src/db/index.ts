import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

declare global {
    var pgPool: Pool | undefined;
}
const isLocalDb = !process.env.DATABASE_URL || process.env.DATABASE_URL.includes("localhost") || process.env.DATABASE_URL.includes("127.0.0.1");

const pool = globalThis.pgPool ?? new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isLocalDb ? false : { rejectUnauthorized: false }
});

if (process.env.NODE_ENV !== "production") {
    globalThis.pgPool = pool;
}

export const db = drizzle(pool, { schema });