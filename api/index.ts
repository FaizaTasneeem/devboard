import express, { type Request, type Response } from "express";
import cors from "cors";
import axios from "axios";
import { env } from "./config/env.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: env.frontendOrigin,
        credentials: true
    })
);

app.use('/api/watchlist', watchlistRoutes);

app.get('/api/repos', async (req: Request, res: Response) => {
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

app.get('/api/repoDetails', async (req: Request, res: Response) => {
    const { data } = await axios.get(
        `https://api.github.com/repos/${req.query.owner}/${req.query.name}`,
        {
            headers: {
                authorization: `Bearer ${env.github_token}`
            }
        }
    );
    res.json(data);
});

app.get('/api/issues', async (req: Request, res: Response) => {
    const { data } = await axios.get(
        `https://api.github.com/repos/${req.query.owner}/${req.query.name}/issues?page=${req.query.pageParam}&per_page=${req.query.issues_per_page}`,
        {
            headers: {
                'authorization': `Bearer ${env.github_token}`
            }
        }
    );
    res.json(data);
});

export default app;