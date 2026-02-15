CREATE TYPE "public"."course_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"school_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"cover_image_url" text,
	"price" integer DEFAULT 0 NOT NULL,
	"capacity" integer,
	"start_date" timestamp,
	"end_date" timestamp,
	"modality" text,
	"average_rating" double precision DEFAULT 0 NOT NULL,
	"enrollments_count" integer DEFAULT 0 NOT NULL,
	"status" "course_status" DEFAULT 'draft' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "average_rating" double precision DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "favorites_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "is_verified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "courses_school_idx" ON "courses" USING btree ("school_id");--> statement-breakpoint
CREATE INDEX "courses_status_idx" ON "courses" USING btree ("status");--> statement-breakpoint
CREATE INDEX "courses_active_idx" ON "courses" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "courses_rating_idx" ON "courses" USING btree ("average_rating");--> statement-breakpoint
CREATE INDEX "schools_rating_idx" ON "schools" USING btree ("average_rating");--> statement-breakpoint
CREATE INDEX "schools_verified_idx" ON "schools" USING btree ("is_verified");