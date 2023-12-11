class ApiError extends Error {
    public message: string;
    public code: number;

    constructor(msg: string, code: number) {
        super();
        this.message = msg;
        this.code = code;
        Error.captureStackTrace(this);
    }
}

export { ApiError };
