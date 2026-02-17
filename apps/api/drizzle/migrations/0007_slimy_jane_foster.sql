CREATE TABLE "students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"public_user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"age" integer NOT NULL,
	"monthly_budget" double precision,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_interests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_id" uuid NOT NULL,
	"category_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_public_user_id_public_users_id_fk" FOREIGN KEY ("public_user_id") REFERENCES "public"."public_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_interests" ADD CONSTRAINT "student_interests_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_interests" ADD CONSTRAINT "student_interests_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "students_user_idx" ON "students" USING btree ("public_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "student_interests_unique" ON "student_interests" USING btree ("student_id","category_id");--> statement-breakpoint
CREATE INDEX "student_interests_student_idx" ON "student_interests" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "student_interests_category_idx" ON "student_interests" USING btree ("category_id");