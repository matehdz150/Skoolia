CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "school_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"school_id" uuid NOT NULL,
	"category_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "logo_url" text;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "cover_image_url" text;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "city" text;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "latitude" double precision;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "longitude" double precision;--> statement-breakpoint
ALTER TABLE "school_categories" ADD CONSTRAINT "school_categories_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "school_categories" ADD CONSTRAINT "school_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "categories_slug_unique" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "school_categories_unique" ON "school_categories" USING btree ("school_id","category_id");--> statement-breakpoint
CREATE INDEX "school_categories_school_idx" ON "school_categories" USING btree ("school_id");--> statement-breakpoint
CREATE INDEX "school_categories_category_idx" ON "school_categories" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "schools_city_idx" ON "schools" USING btree ("city");