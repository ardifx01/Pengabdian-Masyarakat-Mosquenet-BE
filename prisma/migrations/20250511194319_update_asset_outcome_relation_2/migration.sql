/*
  Warnings:

  - Made the column `amount` on table `Assets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `unit` on table `Assets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Assets" ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "unit" SET NOT NULL;
