import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import hpp from "hpp";
import cors from "cors";
import { catch404, globalErrorHandler } from "./loaders/errorHandler";
import { blogRouter } from "./api/routes/blog.routes";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(hpp());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/api/v1/blogs", blogRouter);

// ERROR HANDLERS
app.use(catch404);
app.use(globalErrorHandler);

export { app };
