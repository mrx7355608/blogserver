import { Schema, model } from "mongoose";
import { IBlogMongooseModel } from "../types/blog.types";

const blogSchema = new Schema<IBlogMongooseModel>(
    {
        title: String,
        blogBody: String,
        tags: [String],
        slug: String,
        is_published: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    },
);

blogSchema.virtual("published_on").get(function () {
    return new Date(this.createdAt).toLocaleDateString();
});

const BlogModel = model("Blog", blogSchema);
export { BlogModel };
