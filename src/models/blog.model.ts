import { Schema, model } from "mongoose";
import { IBlogMongoose } from "../data/blog.data"

const blogSchema = new Schema<IBlogMongoose>(
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
