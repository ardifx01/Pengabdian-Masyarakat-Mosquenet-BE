/*
  Warnings:

  - The values [Marbot] on the enum `AdminRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AdminRole_new" AS ENUM ('Ketua', 'Bendahara', 'Sekretaris', 'Pengurus', 'Ustad', 'Donatur');
ALTER TABLE "Admins" ALTER COLUMN "role" TYPE "AdminRole_new" USING ("role"::text::"AdminRole_new");
ALTER TYPE "AdminRole" RENAME TO "AdminRole_old";
ALTER TYPE "AdminRole_new" RENAME TO "AdminRole";
DROP TYPE "AdminRole_old";
COMMIT;

-- CreateTable
CREATE TABLE "Contents" (
    "id" SERIAL NOT NULL,
    "masjid_id" INTEGER NOT NULL,
    "title" INTEGER NOT NULL,
    "post_date" TIMESTAMP(3) NOT NULL,
    "contents" TEXT NOT NULL,
    "visual_content" TEXT,

    CONSTRAINT "Contents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contents" ADD CONSTRAINT "Contents_masjid_id_fkey" FOREIGN KEY ("masjid_id") REFERENCES "Masjids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
