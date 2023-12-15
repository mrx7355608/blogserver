import mockBlogDB from "../../../__mocks__/blogsDB.mock";
import publishBlog from "./publishBlog";

const publish = publishBlog(mockBlogDB);

/* eslint-disable @typescript-eslint/no-explicit-any */
describe("Publish blogs", () => {
    it("should validate blog id", async () => {
        try {
            await publish("123");
        } catch (err: any) {
            expect(err.message).toBe("Invalid blog id");
        }
    });
    it("should return error if blog does not exist", async () => {
        try {
            await publish("6576ea783fca4cc2390a95df");
        } catch (err: any) {
            expect(err.message).toBe("Blog not found");
        }
    });
    it("should return error if blog is already published", async () => {
        try {
            await publish("6576ea783fca4cc2390a95ce");
        } catch (err: any) {
            expect(err.message).toBe("Blog has been published already");
        }
    });
});
