import searchQueryValidator from "./search.validator";

describe("Search query validator", () => {
    it("should invalidate an empty query", () => {
        expect(() => searchQueryValidator("")).toThrow("Cannot search blog with an empty query")
    })
    it("should throw error if no query is given", () => {
        expect(() => searchQueryValidator(undefined as any)).toThrow("Please enter a blog to search")
    })
    it("should throw error if query is not a string", () => {
        expect(() => searchQueryValidator(123 as any)).toThrow("Query should be a string")
    })
})
