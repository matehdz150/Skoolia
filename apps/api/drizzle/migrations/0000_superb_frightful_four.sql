CREATE TABLE "school_favorites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"public_user_id" uuid NOT NULL,
	"school_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schools" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"owner_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "private_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"is_active" text DEFAULT 'true' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "private_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "public_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"avatarUrl" text,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "public_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "school_favorites" ADD CONSTRAINT "school_favorites_public_user_id_public_users_id_fk" FOREIGN KEY ("public_user_id") REFERENCES "public"."public_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "school_favorites" ADD CONSTRAINT "school_favorites_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schools" ADD CONSTRAINT "schools_owner_id_private_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."private_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "school_favorites_unique" ON "school_favorites" USING btree ("public_user_id","school_id");--> statement-breakpoint
CREATE INDEX "school_favorites_user_idx" ON "school_favorites" USING btree ("public_user_id");--> statement-breakpoint
CREATE INDEX "school_favorites_school_idx" ON "school_favorites" USING btree ("school_id");--> statement-breakpoint
CREATE UNIQUE INDEX "schools_owner_unique" ON "schools" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "schools_owner_idx" ON "schools" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "schools_name_idx" ON "schools" USING btree ("name");--> statement-breakpoint
CREATE INDEX "private_users_email_idx" ON "private_users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "private_users_active_idx" ON "private_users" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "public_users_email_idx" ON "public_users" USING btree ("email");