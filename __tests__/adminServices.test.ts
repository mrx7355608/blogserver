import AdminServices from "../src/services/admin.services";
import mockBlogDB from "../mocks/blogsDB.mock";
import { IBlog } from "../src/types/blog.types";

const adminServices = AdminServices(mockBlogDB);

/* eslint-disable @typescript-eslint/no-explicit-any */
describe("Admin Services Tests", () => {
    const data = {
        title: "Jest Mock Functions",
        body: "Mock functions are also very effective in code that uses a functional continuation-passing style. Code written in this style helps avoid the need for complicated stubs that recreate the behavior of the real component they're standing in for, in favor of injecting values directly into the test right before they're used.Mock functions are also very effective in code that uses a functional continuation-passing style. Code written in this style helps avoid the need for complicated stubs that recreate the behavior of the real component they're standing in for, in favor of injecting values directly into the test right before they're used.Mock functions are also very effective in code that uses a functional continuation-passing style. Code written in this style helps avoid the need for complicated stubs that recreate the behavior of the real component they're standing in for, in favor of injecting values directly into the test right before they're used.Mock functions are also very effective in code that uses a functional continuation-passing style. Code written in this style helps avoid the need for complicated stubs that recreate the behavior of the real component they're standing in for, in favor of injecting values directly into the test right before they're used.Mock functions are also very effective in code that uses a functional continuation-passing style. Code written in this style helps avoid the need for complicated stubs that recreate the behavior of the real component they're standing in for, in favor of injecting values directly into the test right before they're used.Mock functions are also very effective in code that uses a functional continuation-passing style. Code written in this style helps avoid the need for complicated stubs that recreate the behavior of the real component they're standing in for, in favor of injecting values directly into the test right before they're used.",
        tags: ["testing", "api"],
    };

    describe("Create a new blog", () => {
        describe("Validate blog title", () => {
            it("should check if blog title is an empty string or not", async () => {
                return expect(
                    adminServices.createNewBlog({ ...data, title: "" }),
                ).rejects.toThrow("Blog title cannot be empty");
            });
            it("should validate title's length", () => {
                return expect(
                    adminServices.createNewBlog({
                        ...data,
                        title: "abc",
                    }),
                ).rejects.toThrow(
                    "Blog title should be atleast 10 characters long",
                );
            });
            it("should check if title is a string or not", async () => {
                return expect(
                    adminServices.createNewBlog({
                        ...data,
                        title: null!,
                    }),
                ).rejects.toThrow("Blog title should be a string");
            });
        });
        describe("Validate blog body", () => {
            it("should check if blog title is an empty string or not", () => {
                return expect(
                    adminServices.createNewBlog({ ...data, body: "" }),
                ).rejects.toThrow("Blog body cannot be empty");
            });
            it("should validate blog body's length", async () => {
                return expect(
                    adminServices.createNewBlog({
                        ...data,
                        body: "abc",
                    }),
                ).rejects.toThrow(
                    "Blog body should be atleast 400 characters long",
                );
            });
            it("should check if body is a string or not", async () => {
                return expect(
                    adminServices.createNewBlog({
                        ...data,
                        body: null!,
                    }),
                ).rejects.toThrow("Blog body should be a string");
            });
        });
    });
});
