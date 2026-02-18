CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"url" text NOT NULL,
	"mime_type" text NOT NULL,
	"size_bytes" integer NOT NULL,
	"owner_id" uuid NOT NULL,
	"owner_type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "files_owner_idx" ON "files" USING btree ("owner_id","owner_type");--> statement-breakpoint
CREATE INDEX "files_key_idx" ON "files" USING btree ("key");