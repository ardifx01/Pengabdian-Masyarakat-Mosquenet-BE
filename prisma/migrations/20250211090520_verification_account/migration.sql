/*
  Warnings:

  - Added the required column `tokenVerification` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tokenVerification" TEXT NOT NULL;
