import blogValidator from "./blog.validator";

describe("Validate blog user inputs", () => {
    const data = {
        title: "Linux Ricing - Installing a i3 tiling window manager",
        blogBody:
            "Linux 'ricing' is basically beautifying your linux desktop environment.Linux 'ricing' is basically beautifying your linux desktop environment.Linux 'ricing' is basically beautifying your linux desktop environment.Linux 'ricing' is basically beautifying your linux desktop environment.Linux 'ricing' is basically beautifying your linux desktop environment.Linux 'ricing' is basically beautifying your linux desktop environment.Linux 'ricing' is basically beautifying your linux desktop environment.Linux 'ricing' is basically beautifying your linux desktop environment.Linux 'ricing' is basically beautifying your linux desktop environment.Linux 'ricing' is basically beautifying your linux desktop environment.Linux 'ricing' is basically beautifying your linux desktop environment.Linux 'ricing' is basically beautifying your linux desktop environment.Linux 'ricing' is basically beautifying your linux desktop environment.Linux 'ricing' is basically beautifying your linux desktop environment.Linux 'ricing' is basically beautifying your linux desktop environment.Linux 'ricing' is basically beautifying your linux desktop environment.",
        tags: ["linux", "OS", "terminal"],
    };

    describe("Title", () => {
        it("should throw error if title is null", () => {
            const d1 = { ...data, title: null! };
            expect(() => blogValidator(d1)).toThrow(
                "Blog title should be a string",
            );
        });
        it("should throw error if title is empty", () => {
            const d2 = { ...data, title: "" };
            expect(() => blogValidator(d2)).toThrow(
                "Blog title cannot be empty",
            );
        });
        it("should throw error if title is short", () => {
            const d3 = { ...data, title: "Shor" };
            expect(() => blogValidator(d3)).toThrow(
                "Blog title should be atleast 10 characters long",
            );
        });
        it("should throw error if title is too long", () => {
            const d4 = {
                ...data,
                title: "AA very long long long lon glong titleA very long long long lon glong titleA very long long long lon glong titleA very long long long lon glong titleA very long long long lon glong titleA very long long long lon glong titleA very long long long lon glong titleA very long long long lon glong titleA very long long long lon glong titleA very long long long lon glong titleA very long long long lon glong titleA very long long long lon glong titleA very long long long lon glong titleA very long long long lon glong titleA very long long long lon glong title very long long long lon glong titleA very long long long lon glong titleA very long long long lon glong titleA very long long long lon glong title",
            };
            expect(() => blogValidator(d4)).toThrow(
                "Blog title should not be longer than 200 characters",
            );
        });
    });

    describe("Body", () => {
        it("should throw error if blog body is not a string / null", () => {
            const d5 = { ...data, blogBody: null! };
            expect(() => blogValidator(d5)).toThrow(
                "Blog body should be a string",
            );
        });
        it("should throw error if blog body is empty", () => {
            const d6 = { ...data, blogBody: "" };
            expect(() => blogValidator(d6)).toThrow(
                "Blog body cannot be empty",
            );
        });
        it("should throw error if blog body is short", () => {
            const d7 = { ...data, blogBody: "hahahhahah" };
            expect(() => blogValidator(d7)).toThrow(
                "Blog body should be atleast 400 characters long",
            );
        });
    });

    describe("Tags", () => {
        it("should throw error if tags are null", () => {
            const d8 = { ...data, tags: null! };
            expect(() => blogValidator(d8)).toThrow(
                "Blog tags should be in a list",
            );
        });
        it("should throw error if tags array is empty", () => {
            const d9 = { ...data, tags: [] };
            expect(() => blogValidator(d9)).toThrow(
                "Add atleast one tag to your blog",
            );
        });
        it("should throw error if tags array contain non-string values", () => {
            // eslint-disable-next-line
            const d10 = { ...data, tags: [213 as any] };
            expect(() => blogValidator(d10)).toThrow(
                "A blog tag should be a string",
            );
        });
    });
});
