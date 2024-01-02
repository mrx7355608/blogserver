import { Schema, model } from "mongoose";
import { IBlogMongoose } from "../types/blog.types"

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
        toJSON: { virtuals: true },
        id: false
    },
);

blogSchema.virtual("published_on").get(function() {
    return new Date(this.createdAt).toDateString();
})

const BlogModel = model("Blog", blogSchema);
export { BlogModel };
