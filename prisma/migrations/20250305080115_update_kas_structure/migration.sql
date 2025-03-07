/*
  Warnings:

  - You are about to drop the column `reference_id` on the `Kas` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `Kas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Kas" DROP COLUMN "reference_id",
DROP COLUMN "sku";

-- AddForeignKey
ALTER TABLE "Kas" ADD CONSTRAINT "Kas_masjid_id_fkey" FOREIGN KEY ("masjid_id") REFERENCES "Masjids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
