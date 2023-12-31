import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

function rateLimiterResponse(_req: Request, res: Response) {
    // Customize the rate limit message here
    const jsonResponse = {
        status: "failed",
        message: "Rate limit exceeded",
        data: null,
    };
    // Set the response status and content type
    res.status(429).json(jsonResponse);
}

const adminLoginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5,
    message: rateLimiterResponse,
});

const adminBlogActionsLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    message: rateLimiterResponse,
});

const adminReadOnlyLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 50,
    message: rateLimiterResponse,
});

export { adminLoginLimiter, adminReadOnlyLimiter, adminBlogActionsLimiter };
