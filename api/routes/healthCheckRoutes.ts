import express from "express";
import { sql } from "drizzle-orm";
import { db } from "../../src/db/index.js";

const router = express.Router();

router.get('/', async (_req, res) => {
    try {
        await db.execute(sql`SELECT 1`);
        res.status(200).json({ status: "ok", database: "connected" });
    } catch (error) {
        console.error("Health check failed:", error);
        res.status(500).json({ status: "error", message: "Database unreachable" });
    }
});

export default router;