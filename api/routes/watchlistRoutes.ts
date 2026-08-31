import express from "express";
import axios from "axios";
import { env } from "../config/env"

const router = express.Router();

router.get('/getList', async (req, res) => {
    const { data } = await axios.get(
        `https://api.github.com/search/repositories?q=${req.query.query}&sort=stars&page=${req.query.pageParam}&per_page=${req.query.repos_per_page}`,
        {
            headers: {
                'authorization': `Bearer ${env.github_token}`
            }
        }
    );
    res.json(data);
});

router.post('/create', async (req, res) => {
    const { data } = await axios.get(
        `https://api.github.com/search/repositories?q=${req.query.query}&sort=stars&page=${req.query.pageParam}&per_page=${req.query.repos_per_page}`,
        {
            headers: {
                'authorization': `Bearer ${env.github_token}`
            }
        }
    );
    res.json(data);
});

router.patch('/update/:id', async (req, res) => {
    const { data } = await axios.get(
        `https://api.github.com/search/repositories?q=${req.query.query}&sort=stars&page=${req.query.pageParam}&per_page=${req.query.repos_per_page}`,
        {
            headers: {
                'authorization': `Bearer ${env.github_token}`
            }
        }
    );
    res.json(data);
});

router.delete('/delete/:id', async (req, res) => {
    const { data } = await axios.get(
        `https://api.github.com/search/repositories?q=${req.query.query}&sort=stars&page=${req.query.pageParam}&per_page=${req.query.repos_per_page}`,
        {
            headers: {
                'authorization': `Bearer ${env.github_token}`
            }
        }
    );
    res.json(data);
});

export default router;