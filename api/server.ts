import app from "./index";
import { env } from "./config/env"

app.listen(env.port, () => {
    try {
        console.log(`Server started at port ${env.port}...`);
    }
    catch (error) {
        console.error(`Failed to start server at port ${env.port}:`, error);
        process.exit(1);
    }
});
