import adminServices from ".";

describe("Publish blogs", () => {
    it("should validate blog id", () => {
        return expect(adminServices.publishBlog("123")).rejects.toThrow(
            "Invalid blog id",
        );
    });
    it("should return error if blog does not exist", () => {
        return expect(
            adminServices.publishBlog("6576ea783fca4cc2390a95df"),
        ).rejects.toThrow("Blog not found");
    });
    it("should return error if blog is already published", () => {
        return expect(
            adminServices.publishBlog("6576ea783fca4cc2390a95ce"),
        ).rejects.toThrow("Blog has been published already");
    });
});
