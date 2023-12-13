export default function slugify(title: string) {
    const titleArr = title.split(" ");
    const slug = titleArr.join("-");
    return slug;
}
