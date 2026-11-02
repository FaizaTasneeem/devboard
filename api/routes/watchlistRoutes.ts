import express from "express";
import { db } from "../../src/db/index.js";
import { watchlist } from "../../src/db/schema.js";
import { eq } from "drizzle-orm";

const router = express.Router();

router.get('/getList', async (_req, res) => {
    try {
        const data = await db.select().from(watchlist);
        res.status(200).json(data);
    }
    catch (error) {
        console.error("Failed to fetch watchlist:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to fetch watchlist"
        });
    }
});

router.post('/create', async (req, res) => {
    try {
        await db.insert(watchlist).values(req.body);
        res.status(200).json({ success: true })
    }
    catch (error) {
        console.error("Failed to add to watchlist:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to add to watchlist"
        });
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        await db.update(watchlist).set(req.body).where(eq(watchlist.id, req.params.id));
        res.status(200).json({ success: true })
    }
    catch (error) {
        console.error(`Failed to update watchlist item ${req.params.id}:`, error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to update watchlist item"
        });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await db.delete(watchlist).where(eq(watchlist.id, req.params.id));
        res.status(200).json({ success: true })
    }
    catch (error) {
        console.error(`Failed to delete watchlist item ${req.params.id}:`, error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to delete watchlist item"
        });
    }
});

export default router;