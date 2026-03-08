CREATE TABLE IF NOT EXISTS "school_messages" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "school_id" uuid NOT NULL,
  "public_user_id" uuid NOT NULL,
  "sender_role" text NOT NULL,
  "content" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

ALTER TABLE "school_messages"
ADD CONSTRAINT "school_messages_school_id_schools_id_fk"
FOREIGN KEY ("school_id")
REFERENCES "public"."schools"("id")
ON DELETE cascade
ON UPDATE no action;

ALTER TABLE "school_messages"
ADD CONSTRAINT "school_messages_public_user_id_public_users_id_fk"
FOREIGN KEY ("public_user_id")
REFERENCES "public"."public_users"("id")
ON DELETE cascade
ON UPDATE no action;

CREATE INDEX IF NOT EXISTS "school_messages_school_idx" ON "school_messages" USING btree ("school_id");
CREATE INDEX IF NOT EXISTS "school_messages_public_user_idx" ON "school_messages" USING btree ("public_user_id");
CREATE INDEX IF NOT EXISTS "school_messages_thread_idx" ON "school_messages" USING btree ("school_id","public_user_id","created_at");
