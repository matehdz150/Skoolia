-- ===============================
-- 1️⃣ DROP old columns (text URLs)
-- ===============================

ALTER TABLE "schools" DROP COLUMN IF EXISTS "logo_url";
ALTER TABLE "schools" DROP COLUMN IF EXISTS "cover_image_url";

ALTER TABLE "public_users" DROP COLUMN IF EXISTS "avatarUrl";

ALTER TABLE "courses" DROP COLUMN IF EXISTS "cover_image_url";

-- ===============================
-- 2️⃣ ADD new UUID columns
-- ===============================

ALTER TABLE "schools"
ADD COLUMN "logo_url" uuid;

ALTER TABLE "schools"
ADD COLUMN "cover_image_url" uuid;

ALTER TABLE "public_users"
ADD COLUMN "avatarUrl" uuid;

ALTER TABLE "courses"
ADD COLUMN "cover_image_url" uuid;

-- ===============================
-- 3️⃣ ADD Foreign Keys
-- ===============================

ALTER TABLE "schools"
ADD CONSTRAINT "schools_logo_url_files_id_fk"
FOREIGN KEY ("logo_url")
REFERENCES "public"."files"("id")
ON DELETE SET NULL
ON UPDATE NO ACTION;

ALTER TABLE "schools"
ADD CONSTRAINT "schools_cover_image_url_files_id_fk"
FOREIGN KEY ("cover_image_url")
REFERENCES "public"."files"("id")
ON DELETE SET NULL
ON UPDATE NO ACTION;

ALTER TABLE "public_users"
ADD CONSTRAINT "public_users_avatarUrl_files_id_fk"
FOREIGN KEY ("avatarUrl")
REFERENCES "public"."files"("id")
ON DELETE SET NULL
ON UPDATE NO ACTION;

ALTER TABLE "courses"
ADD CONSTRAINT "courses_cover_image_url_files_id_fk"
FOREIGN KEY ("cover_image_url")
REFERENCES "public"."files"("id")
ON DELETE SET NULL
ON UPDATE NO ACTION;