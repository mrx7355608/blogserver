import "dotenv/config";
import { connectDB } from "../loaders/database";
import { BlogModel } from "../models/blog.model";
import { IBlog } from "../types/blog.types";
import { faker } from "@faker-js/faker";

async function createFakeBlogs(): Promise<IBlog[]> {
    const fakeBlogs: IBlog[] = [];

    for (let i = 0; i < 10; i++) {
        const blog: IBlog = {
            title: faker.lorem.sentence(),
            blogBody: faker.lorem.paragraphs(5),
            is_published: true,
            tags: Array.from(
                { length: faker.number.int({ min: 1, max: 5 }) },
                () => faker.lorem.word(),
            ),
            slug: faker.helpers.slugify(faker.lorem.sentence()),
            published_on: faker.date.past().toLocaleDateString(),
        };
        fakeBlogs.push(blog);
    }
    return fakeBlogs;
}

async function populate() {
    await connectDB("");
    const blogs = await createFakeBlogs();
    await BlogModel.insertMany(blogs);
}

populate();
