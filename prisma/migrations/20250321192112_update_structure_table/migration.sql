/*
  Warnings:

  - You are about to drop the column `purpose_id` on the `AccountBank` table. All the data in the column will be lost.
  - You are about to drop the column `source_id` on the `Incomes` table. All the data in the column will be lost.
  - You are about to drop the column `reason_id` on the `Outcomes` table. All the data in the column will be lost.
  - You are about to drop the `Kas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `purpose` to the `AccountBank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Incomes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `Outcomes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AdminRole" ADD VALUE 'Ustad';
ALTER TYPE "AdminRole" ADD VALUE 'Donatur';

-- DropForeignKey
ALTER TABLE "AccountBank" DROP CONSTRAINT "AccountBank_purpose_id_fkey";

-- DropForeignKey
ALTER TABLE "Incomes" DROP CONSTRAINT "Incomes_source_id_fkey";

-- DropForeignKey
ALTER TABLE "Kas" DROP CONSTRAINT "Kas_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "Kas" DROP CONSTRAINT "Kas_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "Outcomes" DROP CONSTRAINT "Outcomes_reason_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_account_bank_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_masjid_id_fkey";

-- AlterTable
ALTER TABLE "AccountBank" DROP COLUMN "purpose_id",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "purpose" TEXT NOT NULL,
ALTER COLUMN "account" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Admins" ALTER COLUMN "status" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Incomes" DROP COLUMN "source_id",
ADD COLUMN     "source" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Masters" ALTER COLUMN "status" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Outcomes" DROP COLUMN "reason_id",
ADD COLUMN     "reason" TEXT NOT NULL;

-- DropTable
DROP TABLE "Kas";

-- DropTable
DROP TABLE "Payment";

-- CreateTable
CREATE TABLE "CriticsAndSuggestion" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "CriticsAndSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MosqueArsips" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "masjid_id" INTEGER NOT NULL,
    "document" TEXT NOT NULL,

    CONSTRAINT "MosqueArsips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MosqueLetterTemplate" (
    "id" SERIAL NOT NULL,
    "masjid_id" INTEGER NOT NULL,
    "document" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "MosqueLetterTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "masjid_id" INTEGER NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "amount" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimalsQurban" (
    "id" SERIAL NOT NULL,
    "masjid_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "sell" INTEGER NOT NULL,

    CONSTRAINT "AnimalsQurban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QurbanPayment" (
    "id" SERIAL NOT NULL,
    "animal_id" INTEGER NOT NULL,
    "payment_id" INTEGER NOT NULL,

    CONSTRAINT "QurbanPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Books" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isBorrow" BOOLEAN NOT NULL DEFAULT false,
    "masjid_id" INTEGER NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoaningBooks" (
    "id" SERIAL NOT NULL,
    "users_id" INTEGER NOT NULL,
    "books_id" INTEGER NOT NULL,

    CONSTRAINT "LoaningBooks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MosqueArsips" ADD CONSTRAINT "MosqueArsips_masjid_id_fkey" FOREIGN KEY ("masjid_id") REFERENCES "Masjids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MosqueLetterTemplate" ADD CONSTRAINT "MosqueLetterTemplate_masjid_id_fkey" FOREIGN KEY ("masjid_id") REFERENCES "Masjids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_masjid_id_fkey" FOREIGN KEY ("masjid_id") REFERENCES "Masjids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalsQurban" ADD CONSTRAINT "AnimalsQurban_masjid_id_fkey" FOREIGN KEY ("masjid_id") REFERENCES "Masjids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QurbanPayment" ADD CONSTRAINT "QurbanPayment_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Donation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QurbanPayment" ADD CONSTRAINT "QurbanPayment_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "AnimalsQurban"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_masjid_id_fkey" FOREIGN KEY ("masjid_id") REFERENCES "Masjids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoaningBooks" ADD CONSTRAINT "LoaningBooks_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoaningBooks" ADD CONSTRAINT "LoaningBooks_books_id_fkey" FOREIGN KEY ("books_id") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
