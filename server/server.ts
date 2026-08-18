import express from "express";
import cors from "cors";
import axios from "axios";
import { env } from "./config/env"

const app = express();

app.use(
    cors({
        origin: env.frontendOrigin,
        credentials: true
    })
);


app.get('/api/repos', async (req, res) => {
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

app.get('/api/repoDetails', async (req, res) => {
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

app.get('/api/issues', async (req, res) => {
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


app.listen(env.port, () => {
    try {
        console.log(`Server started at port ${env.port}...`);
    }
    catch (error) {
        console.error(`Failed to start server at port ${env.port}:`, error);
        process.exit(1);
    }
})