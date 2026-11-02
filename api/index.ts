import express from "express";
import cors from "cors";
import axios from "axios";
import { env } from "./config/env.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import healthCheckRoutes from "./routes/healthCheckRoutes.js";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: env.frontendOrigin,
        credentials: true
    })
);

app.use('/api/watchlist', watchlistRoutes);
app.use('/api/health', healthCheckRoutes);


app.get('/api/repos', async (req, res) => {
    try {
        const { data } = await axios.get(
            `https://api.github.com/search/repositories?q=${req.query.query}&sort=stars&page=${req.query.pageParam}&per_page=${req.query.repos_per_page}`,
            {
                headers: {
                    'authorization': `Bearer ${env.github_token}`
                }
            }
        );
        res.status(200).json(data);
    }
    catch (error) {
        console.error("Failed to fetch repositories:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to fetch repositories"
        });

    }
});

app.get('/api/repoDetails', async (req, res) => {
    try {
        const { data } = await axios.get(
            `https://api.github.com/repos/${req.query.owner}/${req.query.name}`,
            {
                headers: {
                    authorization: `Bearer ${env.github_token}`
                }
            }
        );
        res.status(200).json(data);
    }
    catch (error) {
        console.error("Failed to fetch repository details:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to fetch repository details"
        });

    }
});

app.get('/api/issues', async (req, res) => {
    try {
        const { data } = await axios.get(
            `https://api.github.com/repos/${req.query.owner}/${req.query.name}/issues?page=${req.query.pageParam}&per_page=${req.query.issues_per_page}`,
            {
                headers: {
                    'authorization': `Bearer ${env.github_token}`
                }
            }
        );
        res.status(200).json(data);
    }
    catch (error) {
        console.error("Failed to fetch issues:", error);
        res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Failed to fetch issues"
        });

    }
});

export default app;