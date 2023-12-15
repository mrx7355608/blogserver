import adminServices from ".";

describe("Edit blog", () => {
    const changes = {
        title: "Blog 2 - Despair",
        blogBody:
            "A short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despair",
        slug: "blog-2-despair",
        published_on: "Wed Dec 13, 2023",
        is_published: false,
        tags: ["life"],
    };

    it("should validate blog id", () => {
        return expect(
            adminServices.editBlog("123123", changes),
        ).rejects.toThrow("Invalid blog id");
    });
    it("should validate the changes before updating the blog", () => {
        return expect(
            adminServices.editBlog("6576ea783fca4cc2390a95ce", {
                ...changes,
                title: "Abc",
            }),
        ).rejects.toThrow("Blog title should be atleast 10 characters long");
    });
    it.todo("should return error if blog does not exist");
    it.todo("should update the blog");
});
