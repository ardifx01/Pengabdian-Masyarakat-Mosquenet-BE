/*
  Warnings:

  - Added the required column `condition` to the `Assets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('Baik', 'Sedang', 'Rusak');

-- AlterTable
ALTER TABLE "Assets" ADD COLUMN     "condition" "Condition" NOT NULL;
