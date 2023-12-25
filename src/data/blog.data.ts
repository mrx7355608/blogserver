import { BlogModel } from "../models/blog.model";
import { IBlog, IBlogMongooseModel } from "../types/blog.types";

export default function BlogData() {
    async function findAllPublishedBlogs(
        skipVal: number,
    ): Promise<IBlogMongooseModel[]> {
        const query = BlogModel.find({ is_published: true }).lean();
        query.sort("-createdAt");
        query.skip(skipVal);
        query.limit(10);
        const blogs = await query.exec();
        return blogs;
    }

    // Used in searching blogs
    async function findByTitle(
        title: string,
        skipVal: number,
    ): Promise<IBlog[]> {
        // TODO: use title regex instead of title itself
        const blogs = await BlogModel.find({ title, is_published: true })
            .skip(skipVal)
            .limit(10)
            .sort("-createdAt")
            .lean();
        return blogs;
    }

    async function findBySlug(slug: string): Promise<IBlog | null> {
        const blog = await BlogModel.findOne({
            slug,
            is_published: true,
        }).lean();
        return blog;
    }

    // #############################
    //      FOR ADMIN USE ONLY
    // #############################

    async function findAll(skipVal: number): Promise<IBlog[]> {
        const blogs = await BlogModel.find()
            .skip(skipVal)
            .limit(10)
            .sort("-createdAt")
            .lean();
        return blogs;
    }

    async function findByID(id: string): Promise<IBlog | null> {
        const blog = await BlogModel.findById(id).lean();
        return blog;
    }
    async function create(data: IBlog): Promise<IBlog> {
        const newBlog = await BlogModel.create(data);
        return newBlog;
    }

    async function updateByID(
        id: string,
        changes: Partial<IBlog>,
    ): Promise<IBlog> {
        const updatedBlog = await BlogModel.findByIdAndUpdate(id, changes, {
            new: true,
        });
        return updatedBlog as IBlogMongooseModel;
    }

    async function deleteByID(id: string): Promise<null> {
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
