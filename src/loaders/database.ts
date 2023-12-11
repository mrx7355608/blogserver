import mongoose from "mongoose";

async function connectDB(uri: string) {
    await mongoose.connect(uri);
    console.log("[DATABASE] Connected!");
}

async function disconnectDB() {
    await mongoose.disconnect();
    console.log("[DATABASE] Disconnected!");
}

export { connectDB, disconnectDB };
