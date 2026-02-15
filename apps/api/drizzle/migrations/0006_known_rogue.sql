CREATE TABLE "school_ratings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"school_id" uuid NOT NULL,
	"public_user_id" uuid NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "school_ratings" ADD CONSTRAINT "school_ratings_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "school_ratings" ADD CONSTRAINT "school_ratings_public_user_id_public_users_id_fk" FOREIGN KEY ("public_user_id") REFERENCES "public"."public_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "school_rating_unique" ON "school_ratings" USING btree ("school_id","public_user_id");--> statement-breakpoint
CREATE INDEX "school_ratings_school_idx" ON "school_ratings" USING btree ("school_id");