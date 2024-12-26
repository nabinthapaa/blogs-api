import { NotFoundError } from "@/errors/NotFoundError";
import { UnauthorizedError } from "@/errors/UnauthorizedError";
import { CommentModel } from "@/models/comment";
import {
  createComment,
  deleteComment,
  updateComment,
} from "@/services/comment";

jest.mock("@/models/comment.ts");

const mockComment = {
  id: "commentId",
  comment: "this is comment",
  userId: "userId",
  postId: "postId",
};

describe("Comment Serivce => CreateComment", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("Should create comment", async () => {
    (CommentModel.createComment as jest.Mock).mockResolvedValue(mockComment);

    await expect(
      createComment("this is comment", "userId", "postId"),
    ).resolves.toEqual(mockComment);

    expect(CommentModel.createComment).toHaveBeenCalledTimes(1);
    expect(CommentModel.createComment).toHaveBeenCalledWith(
      "postId",
      "userId",
      "this is comment",
    );
  });
});

describe("Comment Serivce => updateComment", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("Should throw error when comment is not found", async () => {
    (CommentModel.getCommentById as jest.Mock).mockResolvedValue(null);

    await expect(
      updateComment("this is new comment", "userId", "commentId"),
    ).rejects.toThrow(NotFoundError);

    expect(CommentModel.getCommentById).toHaveBeenCalledTimes(1);
    expect(CommentModel.getCommentById).toHaveBeenCalledWith("commentId");

    expect(CommentModel.updateComment).not.toHaveBeenCalled();
  });

  it("Should throw UnauthorizedError when other user tries to edit", async () => {
    (CommentModel.getCommentById as jest.Mock).mockResolvedValue(mockComment);

    await expect(
      updateComment("this is comment", "userId2", "commentId"),
    ).rejects.toThrow(UnauthorizedError);

    expect(CommentModel.getCommentById).toHaveBeenCalledTimes(1);
    expect(CommentModel.getCommentById).toHaveBeenCalledWith("commentId");

    expect(CommentModel.updateComment).not.toHaveBeenCalled();
  });

  it("Should update comment", async () => {
    (CommentModel.getCommentById as jest.Mock).mockResolvedValue(mockComment);
    (CommentModel.updateComment as jest.Mock).mockResolvedValue({
      ...mockComment,
      comment: "this is new comment",
    });

    await expect(
      updateComment("this is new comment", "userId", "commentId"),
    ).resolves.toEqual({
      ...mockComment,
      comment: "this is new comment",
    });

    expect(CommentModel.getCommentById).toHaveBeenCalledTimes(1);
    expect(CommentModel.getCommentById).toHaveBeenCalledWith("commentId");

    expect(CommentModel.updateComment).toHaveBeenCalledTimes(1);
  });
});

describe("Comment Service => deleteComment", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Should throw error when comment is not found", async () => {
    (CommentModel.getCommentById as jest.Mock).mockResolvedValue(null);

    await expect(deleteComment("userId", "commentId")).rejects.toThrow(
      NotFoundError,
    );

    expect(CommentModel.getCommentById).toHaveBeenCalledTimes(1);
    expect(CommentModel.getCommentById).toHaveBeenCalledWith("commentId");

    expect(CommentModel.deleteComment).not.toHaveBeenCalled();
  });

  it("Should throw UnauthorizedError when other user tries to delete", async () => {
    (CommentModel.getCommentById as jest.Mock).mockResolvedValue(mockComment);

    await expect(deleteComment("userId2", "commentId")).rejects.toThrow(
      UnauthorizedError,
    );

    expect(CommentModel.getCommentById).toHaveBeenCalledTimes(1);
    expect(CommentModel.getCommentById).toHaveBeenCalledWith("commentId");

    expect(CommentModel.deleteComment).not.toHaveBeenCalled();
  });

  it("Should delete  comment", async () => {
    (CommentModel.getCommentById as jest.Mock).mockResolvedValue(mockComment);
    (CommentModel.deleteComment as jest.Mock).mockResolvedValue(undefined);

    await expect(deleteComment("userId", "commentId")).resolves.toBeUndefined();

    expect(CommentModel.getCommentById).toHaveBeenCalledTimes(1);
    expect(CommentModel.getCommentById).toHaveBeenCalledWith("commentId");

    expect(CommentModel.deleteComment).toHaveBeenCalledTimes(1);
    expect(CommentModel.deleteComment).toHaveBeenCalledWith("commentId");
  });
});
