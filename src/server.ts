import "dotenv/config";
import { app } from "./app";
import { connectDB } from "./loaders/database";

const port = process.env.PORT || 8000;

async function startServer() {
    await connectDB(process.env.DATABASE_URL as string);
    app.listen(port, () => {
        console.log("express server started on", port);
    });
}

startServer();
