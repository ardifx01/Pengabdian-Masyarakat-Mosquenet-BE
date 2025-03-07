/*
  Warnings:

  - Added the required column `ward_id` to the `Masjids` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Masjids" ADD COLUMN     "ward_id" INTEGER NOT NULL;
