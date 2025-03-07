/*
  Warnings:

  - Added the required column `unit` to the `Assets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assets" ADD COLUMN     "unit" TEXT NOT NULL;
