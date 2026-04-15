CREATE TYPE "public"."course_difficulty" AS ENUM('básico', 'intermedio', 'avanzado');--> statement-breakpoint
CREATE TYPE "public"."course_duration_unit" AS ENUM('horas', 'semanas');--> statement-breakpoint
CREATE TYPE "public"."course_modality" AS ENUM('online', 'presencial', 'híbrido');--> statement-breakpoint
ALTER TABLE "courses" DROP CONSTRAINT "courses_cover_image_url_files_id_fk";
--> statement-breakpoint
DROP INDEX "courses_school_idx";--> statement-breakpoint
DROP INDEX "courses_status_idx";--> statement-breakpoint
DROP INDEX "courses_active_idx";--> statement-breakpoint
DROP INDEX "courses_rating_idx";--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "price" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "price" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "modality" SET DATA TYPE "public"."course_modality" USING "modality"::"public"."course_modality";--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "modality" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "title" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "duration_value" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "duration_unit" "course_duration_unit" NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "difficulty_level" "course_difficulty" NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "certification" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "cover_image_url";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "capacity";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "start_date";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "end_date";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "average_rating";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "enrollments_count";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "status";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "is_active";--> statement-breakpoint
DROP TYPE "public"."course_status";