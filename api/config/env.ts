import dotenv from "dotenv";

dotenv.config();

export const env = {
    port: process.env.PORT || "5000",
    frontendOrigin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    github_token: process.env.GITHUB_TOKEN,
    database_url: process.env.DATABASE_URL
}