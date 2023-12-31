import rateLimit from "express-rate-limit";

const adminLoginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5,
});

const adminBlogActionsLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
});

const adminReadOnlyLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 50,
});

export { adminLoginLimiter, adminReadOnlyLimiter, adminBlogActionsLimiter };
