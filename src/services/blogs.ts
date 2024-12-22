import { UnauthorizedError } from "@/errors/UnauthorizedError";
import { BlogModel } from "@/models/blogs";
import { IBlog, IBlogDB } from "@/types/index";
import { sluggify } from "@/utils/sluggify";

export async function createPost(
  data: IBlog,
  userId: string,
): Promise<IBlogDB> {
  const slug = sluggify(data.title);
  return await BlogModel.createPost({
    ...data,
    author: userId,
    slug,
  });
}

export async function updatePost(
  id: string,
  data: Partial<IBlog>,
  userId: string,
): Promise<IBlog> {
  const post = await BlogModel.getPostById(id);
  if (post.id !== userId) {
    throw new UnauthorizedError("Cannot edit post");
  }

  if (data.title !== post.title && data?.title) {
    const slug = sluggify(data.title);
    return await BlogModel.updateBlog(id, {
      ...data,
      author: userId,
      slug,
    });
  } else {
    return await BlogModel.updateBlog(id, {
      ...data,
      author: userId,
    });
  }
}

export async function getPostById(id: string): Promise<IBlog> {
  return await BlogModel.getPostById(id);
}

export async function getPosts(userId: string): Promise<IBlog[]> {
  return await BlogModel.getPostByAuthor(userId);
}

export async function deletePost(id: string): Promise<void> {
  return await BlogModel.deleteBlog(id);
}
