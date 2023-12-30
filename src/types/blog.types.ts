export interface IBlog {
    title: string;
    blogBody: string;
    tags: string[];
    slug: string;
    is_published: boolean;
    published_on: string; // date string
}
