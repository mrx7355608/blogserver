import { Schema, model } from "mongoose";
import { IBlogMongooseModel } from "../types/blog.types";

const blogSchema = new Schema<IBlogMongooseModel>(
    {
        title: String,
        blogBody: String,
        tags: [String],
        slug: String,
        is_published: Boolean,
    },
    {
        timestamps: true,
    },
);

const BlogModel = model("Blog", blogSchema);
export { BlogModel };
