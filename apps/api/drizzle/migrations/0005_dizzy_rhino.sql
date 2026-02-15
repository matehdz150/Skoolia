ALTER TABLE "schools" ADD COLUMN "educational_level" text;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "institution_type" text;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "schedule" text;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "max_students_per_class" integer;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "languages" text;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "enrollment_year" integer;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "enrollment_open" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "monthly_price" integer;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "ratings_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "ranking_score" double precision DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "schools" ADD COLUMN "is_featured" boolean DEFAULT false NOT NULL;