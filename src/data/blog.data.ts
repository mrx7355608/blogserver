import { BlogModel } from "../models/blog.model";
import { IBlog } from "../types/blog.types";

export default function BlogData() {
    async function findAllPublishedBlogs(skipVal: number) {
        const blogs = await BlogModel.find({ is_published: true })
            .skip(skipVal)
            .limit(10)
            .sort("-createdAt");
        return blogs;
    }

    // Used in searching blogs
    async function findByTitle(title: string, skipVal: number) {
        // TODO: use title regex instead of title itself
        const blogs = await BlogModel.findOne({ title, is_published: true })
            .skip(skipVal)
            .limit(10)
            .sort("-createdAt");
        return blogs;
    }

    async function findBySlug(slug: string) {
        const blog = await BlogModel.findOne({ slug, is_published: true });
        return blog;
    }

    // #############################
    //      FOR ADMIN USE ONLY
    // #############################

    async function findAll(skipVal: number) {
        const blogs = await BlogModel.find()
            .skip(skipVal)
            .limit(10)
            .sort("-createdAt");
        return blogs;
    }

    async function findByID(id: string) {
        const blog = await BlogModel.findById(id);
        return blog;
    }
    async function create(data: IBlog) {
        const newBlog = await BlogModel.create(data);
        return newBlog;
    }

    async function updateByID(id: string, changes: Partial<IBlog>) {
        const updatedBlog = await BlogModel.findByIdAndUpdate(id, changes, {
            new: true,
        });
        return updatedBlog;
    }

    async function deleteByID(id: string) {
        await BlogModel.findByIdAndDelete(id);
        return null;
    }

    async function findByFilter(
        is_published: boolean,
        sortBy: string,
        skipVal: number,
    ) {
        const blogs = await BlogModel.find({ is_published })
            .sort(sortBy)
            .skip(skipVal)
            .limit(10);
        return blogs;
    }

    return {
        findAll,
        findByFilter,
        findByID,
        findBySlug,
        findByTitle,
        findAllPublishedBlogs,
        create,
        updateByID,
        deleteByID,
    };
}
