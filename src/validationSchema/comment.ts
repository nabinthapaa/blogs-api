import { z } from "zod";

export const commentSchema = z.object({
  comment: z.string({ message: "Comment cannot be empty" }),
  postId: z.string({ message: "Post id must be provided" }),
});
