import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Card from "@/components/Card";
import { MDXRemote } from "next-mdx-remote";
import BlogModal from "@/components/BlogModal";
const BlogPage = () => {
  const posts = fs.readdirSync(path.join("posts")).map((filename) => {
    const slug = filename.replace(".mdx", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    const { content } = matter(markdownWithMeta);
    return {
      slug,
      frontmatter,
      content,
    };
  });

  return (
    <div className="flex flex-col items-center w-full h-full overflow-y-auto">
      <h1 className="py-6 text-4xl font-bold">Blog</h1>
      <div className="flex flex-col items-center w-full h-full overflow-y-auto">
        {posts.map((post) => (
          <Card key={post.slug} className="w-1/2 p-6 m-6">
            <p className="text-3xl font-bold text-slate-600">
              {post.frontmatter.title}
            </p>
            <p className="py-4">{post.frontmatter.description}</p>
            <p>{post.frontmatter.publishedAt}</p>
          </Card>
        ))}
      </div>
      <div id="modal" />
    </div>
  );
};

export default BlogPage;
