export interface IBlog {
    title: string;
    blogBody: string;
    tags: string[];
    slug: string;
    is_published: boolean;
}

export interface IBlogMongooseModel extends Document, IBlog {
    published_on: string; // virtual property
    createdAt: Date;
    updatedAt: Date;
}
