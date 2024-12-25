ALTER TABLE "images" RENAME TO "image";--> statement-breakpoint
ALTER TABLE "image" DROP CONSTRAINT "images_post_id_blogs_id_fk";
--> statement-breakpoint
ALTER TABLE "image" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "image" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "image" ADD CONSTRAINT "image_post_id_blogs_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blogs"("id") ON DELETE no action ON UPDATE no action;