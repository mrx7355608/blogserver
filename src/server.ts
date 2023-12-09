import "dotenv/config";
import { app } from "./app";

const port = process.env.PORT || 8000;

async function startServer() {
    app.listen(port, () => {
        console.log("express server started on", port);
    });
}

startServer();
