import loginDataValidator from "./auth.validator";

describe("Login validations", () => {
    const loginCreds = {
        username: "fawadimran",
        password: "1234567890"
    }
    it("should throw error on invalid username", () => {
        expect(() => loginDataValidator({ ...loginCreds, username: 123 as any }))
        .toThrow("Invalid username")
    })
    it("should throw error if username is not given",() => {
        expect(() => loginDataValidator({ password: "123213213123" } as any))
        .toThrow("Please enter your username")
    })

    it("should throw error if pswd is not given", () => {
        expect(() => loginDataValidator({ username: "fawad" } as any))
        .toThrow("Please enter your password")
    })
    it("should throw error on invalid password", () => {
        expect(() => loginDataValidator({ ...loginCreds, password: {} as any }))
        .toThrow("Invalid password")
    })

    it("should throw error if data contains unknown fields", () => {
        expect(
            () => loginDataValidator(
                { ...loginCreds, is_admin: true, test: undefined } as any
            )
        )
        .toThrow("Unknown field detected, cannot login")
    })
})
