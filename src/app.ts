import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import hpp from "hpp";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { catch404, globalErrorHandler } from "./loaders/errorHandler";
import { blogRouter } from "./api/routes/blog.routes";
import { adminRouter } from "./api/routes/admin.routes";
import passportSetup from "./passport";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(hpp());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 24 * 3600 * 1000, // 1 day
        },
    }),
);
app.use(passport.initialize());
app.use(passport.session());
passportSetup();

// ROUTES
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/admin", adminRouter);

// ERROR HANDLERS
app.use(catch404);
app.use(globalErrorHandler);

export { app };
