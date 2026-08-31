import express from "express";
import { db } from "../../src/db";
import { watchlist } from "../../src/db/schema";
import { eq } from "drizzle-orm";

const router = express.Router();

router.get('/getList', async (req, res) => {
    const data = await db.select().from(watchlist);
    res.json(data);
});

router.post('/create', async (req, res) => {
    console.log(req.body);
    await db.insert(watchlist).values(req.body);
    res.status(200).json({ success: true })
});

router.patch('/update/:id', async (req, res) => {
    await db.update(watchlist).set(req.body).where(eq(watchlist.id, req.params.id));
    res.status(200).json({ success: true })
});

router.delete('/delete/:id', async (req, res) => {
    await db.delete(watchlist).where(eq(watchlist.id, req.params.id));
    res.status(200).json({ success: true })
});

export default router;