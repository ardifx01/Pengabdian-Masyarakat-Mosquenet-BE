/*
  Warnings:

  - The primary key for the `Kas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Kas` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Kas" DROP CONSTRAINT "Kas_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "Kas_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Kas_id_key" ON "Kas"("id");
