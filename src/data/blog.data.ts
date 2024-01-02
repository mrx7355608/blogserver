import { BlogModel } from "../models/blog.model";
import { IBlogMongoose } from "../types/blog.types";
import { IBlog } from "../types/blog.types";

export default function BlogData() {
    async function findAllPublishedBlogs(
        skipVal: number,
    ): Promise<IBlog[]> {
        const blogs = await BlogModel.find(
            { is_published: true },
            {
                _id: 0,
                id: 0,
                __v: 0,
                createdAt: 0,
                updatedAt: 0,
                is_published: 0
            }
        )
            .sort("-createdAt")
            .skip(skipVal)
            .limit(10)
        return blogs as IBlog[];
    }

    async function findByTitle(
        title: string,
        skipVal: number,
    ): Promise<IBlog[]> {
        const blogs = await BlogModel.find(
            { 
                title: {
                    $regex: new RegExp(title),
                    $options: "i",
                }, 
                is_published: true 
            },
            {
                _id: 0,
                id: 0,
                __v: 0,
                createdAt: 0,
                updatedAt: 0,
                is_published: 0
            }
        )
            .skip(skipVal)
            .limit(10)
            .sort("-createdAt")
        return blogs;
    }

    async function findBySlug(slug: string): Promise<IBlog | null> {
        const blog = await BlogModel.findOne({
            slug,
            is_published: true,
        })
        return blog ? serialize(blog) : null;
    }

    // #############################
    //      FOR ADMIN USE ONLY
    // #############################
    async function findAll(skipVal: number): Promise<IBlog[]> {
        const blogs = await BlogModel.find({}, {
            _id: 0,
            id: 0,
            __v: 0,
            createdAt: 0,
            updatedAt: 0,
            is_published: 0
        })
            .skip(skipVal)
            .limit(10)
            .sort("-createdAt")
        return blogs;
    }

    async function findByID(id: string): Promise<IBlog | null> {
        const blog = await BlogModel.findById(id);
        return blog ? serialize(blog) : null;
    }
    async function create(data: IBlog): Promise<IBlog> {
        const newBlog = await BlogModel.create(data);
        return serialize(newBlog);
    }

    async function updateByID(
        id: string,
        changes: Partial<IBlog>,
    ): Promise<IBlog> {
        const updatedBlog = await BlogModel.findByIdAndUpdate(id, changes, {
            new: true,
        });
        return serialize(updatedBlog as IBlogMongoose);
    }

    async function deleteByID(id: string): Promise<null> {
        await BlogModel.findByIdAndDelete(id);
        return null;
    }

    // ***FIX REQUIRED***
    // ERROR: same error as the previous error
    async function findByFilter(
        is_published: boolean,
        sortBy: string,
        skipVal: number,
    ) {
        const blogs = await BlogModel.find(
            { is_published },
            {
                _id: 0,
                id: 0,
                __v: 0,
                createdAt: 0,
                updatedAt: 0,
                is_published: 0
            }
        )
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

function serialize(blog: IBlogMongoose): IBlog {
    return {
        title: blog.title,
        published_on: blog.published_on,
        tags: blog.tags,
        blogBody: blog.blogBody,
        is_published: blog.is_published,
        slug: blog.slug
    }
}
