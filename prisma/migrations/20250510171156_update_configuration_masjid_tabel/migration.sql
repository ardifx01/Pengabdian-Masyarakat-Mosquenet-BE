/*
  Warnings:

  - Added the required column `is_template_documents_used` to the `Configuration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Configuration" ADD COLUMN     "is_template_documents_used" BOOLEAN NOT NULL;
