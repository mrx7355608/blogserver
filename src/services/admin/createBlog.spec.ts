import mockBlogDB from "../../../__mocks__/blogsDB.mock";
import createBlog from "./createBlog";

const createNewBlog = createBlog(mockBlogDB);

describe("Create a new blog", () => {
    const data = {
        title: "Jest Mock Functions",
        body: "Mock functions are also very effective in code that uses a functional continuation-passing style. Code written in this style helps avoid the need for complicated stubs that recreate the behavior of the real component they're standing in for, in favor of injecting values directly into the test right before they're used.Mock functions are also very effective in code that uses a functional continuation-passing style. Code written in this style helps avoid the need for complicated stubs that recreate the behavior of the real component they're standing in for, in favor of injecting values directly into the test right before they're used.Mock functions are also very effective in code that uses a functional continuation-passing style. Code written in this style helps avoid the need for complicated stubs that recreate the behavior of the real component they're standing in for, in favor of injecting values directly into the test right before they're used.Mock functions are also very effective in code that uses a functional continuation-passing style. Code written in this style helps avoid the need for complicated stubs that recreate the behavior of the real component they're standing in for, in favor of injecting values directly into the test right before they're used.Mock functions are also very effective in code that uses a functional continuation-passing style. Code written in this style helps avoid the need for complicated stubs that recreate the behavior of the real component they're standing in for, in favor of injecting values directly into the test right before they're used.Mock functions are also very effective in code that uses a functional continuation-passing style. Code written in this style helps avoid the need for complicated stubs that recreate the behavior of the real component they're standing in for, in favor of injecting values directly into the test right before they're used.",
        tags: ["testing", "api"],
    };

    it("should check if blog title is an empty string or not", async () => {
        return expect(createNewBlog({ ...data, title: "" })).rejects.toThrow(
            "Blog title cannot be empty",
        );
    });
    it("should validate title's length", () => {
        return expect(
            createNewBlog({
                ...data,
                title: "abc",
            }),
        ).rejects.toThrow("Blog title should be atleast 10 characters long");
    });
    it("should check if title is a string or not", async () => {
        return expect(
            createNewBlog({
                ...data,
                title: null!,
            }),
        ).rejects.toThrow("Blog title should be a string");
    });

    it("should check if blog body is an empty string or not", () => {
        return expect(createNewBlog({ ...data, body: "" })).rejects.toThrow(
            "Blog body cannot be empty",
        );
    });
    it("should validate blog body's length", async () => {
        return expect(
            createNewBlog({
                ...data,
                body: "abc",
            }),
        ).rejects.toThrow("Blog body should be atleast 400 characters long");
    });
    it("should check if body is a string or not", async () => {
        return expect(
            createNewBlog({
                ...data,
                body: null!,
            }),
        ).rejects.toThrow("Blog body should be a string");
    });
    it("should check if the tags are provided", () => {
        return expect(
            createNewBlog({
                ...data,
                tags: null!,
            }),
        ).rejects.toThrow("Blog tags should be in a list");
    });
    it("should check if tags list is not empty", () => {
        return expect(
            createNewBlog({
                ...data,
                tags: [],
            }),
        ).rejects.toThrow("Add atleast one tag to your blog");
    });
});
