import loginDataValidator from "./auth.validator";

/* eslint-disable @typescript-eslint/no-explicit-any */
describe("Login validations", () => {
    const loginCreds = {
        username: "fawadimran",
        password: "1234567890",
    };
    it("should throw error on invalid username", () => {
        const error = loginDataValidator({
            ...loginCreds,
            username: 123 as any,
        });
        expect(error).toBe("Invalid username");
    });
    it("should throw error if username is not given", () => {
        const error = loginDataValidator({ password: "123213213123" } as any);
        expect(error).toBe("Please enter your username");
    });

    it("should throw error if pswd is not given", () => {
        const error = loginDataValidator({ username: "fawad" } as any);
        expect(error).toBe("Please enter your password");
    });
    it("should throw error on invalid password", () => {
        const error = loginDataValidator({
            ...loginCreds,
            password: {} as any,
        });
        expect(error).toBe("Invalid password");
    });

    it("should throw error if data contains unknown fields", () => {
        const error = loginDataValidator({
            ...loginCreds,
            is_admin: true,
            test: undefined,
        } as any);
        expect(error).toBe("Unknown field detected, cannot login");
    });
});
