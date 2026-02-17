DROP INDEX "students_user_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "students_public_user_unique" ON "students" USING btree ("public_user_id");