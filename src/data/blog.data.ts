import { BlogModel } from "../models/blog.model";
import { IBlog } from "../types/blog.types";

const BlogData = () => {
    async function findAll(skipVal: number) {
        const blogs = await BlogModel.find({ is_published: true })
            .skip(skipVal)
            .limit(10);
        return blogs;
    }

    async function findByID(id: string) {
        const blog = await BlogModel.findById(id);
        return blog;
    }

    const findByTitle = async (title: string, skipVal: number) => {
        const blogs = await BlogModel.findOne({ title, is_published: true })
            .skip(skipVal)
            .limit(10);
        return blogs;
    };

    async function findBySlug(slug: string) {
        const blog = await BlogModel.findOne({ slug, is_published: true });
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

    return {
        findAll,
        findByID,
        findBySlug,
        findByTitle,
        create,
        updateByID,
        deleteByID,
    };
};

export { BlogData };
