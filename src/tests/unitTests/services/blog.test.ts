import { UnauthorizedError } from "@/errors/UnauthorizedError";
import { BlogModel } from "@/models/blogs";
import {
  createPost,
  getPostById,
  getPosts,
  updatePost,
} from "@/services/blogs";
import { sluggify } from "@/utils/sluggify";

jest.mock("@/models/blogs");
jest.mock("@/utils/sluggify");

const mockBlog = {
  title: "title of blog",
  content: "content of blog",
};

describe("Blog Service => creatPost", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Should create post", async () => {
    (BlogModel.createPost as jest.Mock).mockResolvedValue({
      ...mockBlog,
      author: "authorId",
      slug: "title-of-blog",
    });
    (sluggify as jest.Mock).mockReturnValue("title-of-blog");

    await expect(createPost(mockBlog, "authorId")).resolves.toEqual({
      ...mockBlog,
      author: "authorId",
      slug: "title-of-blog",
    });

    expect(sluggify).toHaveBeenCalledTimes(1);
    expect(sluggify).toHaveBeenCalledWith(mockBlog.title);

    expect(BlogModel.createPost).toHaveBeenCalledTimes(1);
    expect(BlogModel.createPost).toHaveBeenCalledWith({
      ...mockBlog,
      author: "authorId",
      slug: "title-of-blog",
    });
  });
});

describe("Blog Service => updatePost", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Should throw UnauthorizedError when author id does not match", async () => {
    (BlogModel.getPostById as jest.Mock).mockResolvedValue({
      ...mockBlog,
      author: "authorId2",
      slug: "title-of-blog",
    });

    await expect(updatePost("blogId", mockBlog, "authorId")).rejects.toThrow(
      UnauthorizedError,
    );

    expect(sluggify).not.toHaveBeenCalled();
    expect(BlogModel.updateBlog).not.toHaveBeenCalled();
  });

  it("Should return updated data", async () => {
    (BlogModel.getPostById as jest.Mock).mockResolvedValue({
      ...mockBlog,
      author: "authorId",
      slug: "title-of-blog",
    });

    (BlogModel.updateBlog as jest.Mock).mockResolvedValue({
      ...mockBlog,
      author: "authorId",
      slug: "title-of-blog",
    });
    (sluggify as jest.Mock).mockReturnValue("title-of-blog");

    await expect(
      updatePost("blogId", { content: "test content" }, "authorId"),
    ).resolves.toEqual({
      ...mockBlog,
      author: "authorId",
      slug: "title-of-blog",
    });

    expect(sluggify).not.toHaveBeenCalled();
    expect(BlogModel.updateBlog).toHaveBeenCalledTimes(1);
    expect(BlogModel.updateBlog).toHaveBeenCalledWith("blogId", {
      content: "test content",
      author: "authorId",
    });
  });

  it("Should return updated data with new title and slug when title is changed", async () => {
    (BlogModel.getPostById as jest.Mock).mockResolvedValue({
      ...mockBlog,
      author: "authorId",
      slug: "title-of-blog",
    });

    (BlogModel.updateBlog as jest.Mock).mockResolvedValue({
      ...mockBlog,
      author: "authorId",
      slug: "new-title-of-blog",
    });
    (sluggify as jest.Mock).mockReturnValue("new-title-of-blog");

    await expect(
      updatePost("blogId", { title: "New title of blog" }, "authorId"),
    ).resolves.toEqual({
      ...mockBlog,
      author: "authorId",
      slug: "new-title-of-blog",
    });

    expect(sluggify).toHaveBeenCalledTimes(1);
    expect(sluggify).toHaveBeenCalledWith("New title of blog");
    expect(BlogModel.updateBlog).toHaveBeenCalledTimes(1);
    expect(BlogModel.updateBlog).toHaveBeenCalledWith("blogId", {
      title: "New title of blog",
      slug: "new-title-of-blog",
      author: "authorId",
    });
  });
});

describe("Blog service => getPostById", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Should return null when post is not found with id", async () => {
    (BlogModel.getPostById as jest.Mock).mockResolvedValue(null);
    await expect(getPostById("blogId")).resolves.toBeNull();

    expect(BlogModel.getPostById).toHaveBeenCalledWith("blogId");
    expect(BlogModel.getPostById).toHaveBeenCalledTimes(1);
  });

  it("Should return post when post is found with id", async () => {
    (BlogModel.getPostById as jest.Mock).mockResolvedValue({
      ...mockBlog,
      author: "authorId",
      slug: "title-of-blog",
    });
    await expect(getPostById("blogId")).resolves.toEqual({
      ...mockBlog,
      author: "authorId",
      slug: "title-of-blog",
    });

    expect(BlogModel.getPostById).toHaveBeenCalledWith("blogId");
    expect(BlogModel.getPostById).toHaveBeenCalledTimes(1);
  });
});

describe("Blog service => getPosts", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Should return empty array when no post is found for user", async () => {
    (BlogModel.getPostByAuthor as jest.Mock).mockResolvedValue([]);
    await expect(getPosts("authorId")).resolves.toEqual([]);

    expect(BlogModel.getPostByAuthor).toHaveBeenCalledWith("authorId");
    expect(BlogModel.getPostByAuthor).toHaveBeenCalledTimes(1);
  });

  it("Should return  array of post when post is found for user", async () => {
    (BlogModel.getPostByAuthor as jest.Mock).mockResolvedValue([
      {
        ...mockBlog,
        author: "authorId",
        slug: "title-of-blog",
      },
    ]);
    await expect(getPosts("authorId")).resolves.toEqual([
      {
        ...mockBlog,
        author: "authorId",
        slug: "title-of-blog",
      },
    ]);

    expect(BlogModel.getPostByAuthor).toHaveBeenCalledWith("authorId");
    expect(BlogModel.getPostByAuthor).toHaveBeenCalledTimes(1);
  });
});
