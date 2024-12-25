ALTER TABLE "comment" RENAME TO "comments";--> statement-breakpoint
ALTER TABLE "image" RENAME TO "images";--> statement-breakpoint
ALTER TABLE "user" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_author_user_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comment_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comment_post_id_blogs_id_fk";
--> statement-breakpoint
ALTER TABLE "images" DROP CONSTRAINT "image_post_id_blogs_id_fk";
--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_blogs_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blogs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_post_id_blogs_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blogs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");