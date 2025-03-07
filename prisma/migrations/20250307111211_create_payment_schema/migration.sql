/*
  Warnings:

  - You are about to drop the column `amount` on the `Kas` table. All the data in the column will be lost.
  - You are about to drop the column `masjid_id` on the `Kas` table. All the data in the column will be lost.
  - You are about to drop the column `qr_string` on the `Kas` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Kas` table. All the data in the column will be lost.
  - The `id` column on the `Kas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[payment_id]` on the table `Kas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payment_id` to the `Kas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Kas" DROP CONSTRAINT "Kas_masjid_id_fkey";

-- DropIndex
DROP INDEX "Kas_id_key";

-- AlterTable
ALTER TABLE "Kas" DROP COLUMN "amount",
DROP COLUMN "masjid_id",
DROP COLUMN "qr_string",
DROP COLUMN "status",
ADD COLUMN     "payment_id" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Kas_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "amount" INTEGER NOT NULL,
    "masjid_id" INTEGER NOT NULL,
    "qr_string" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AccountBank" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "alias_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "masjid_id" INTEGER NOT NULL,
    "purpose_id" INTEGER NOT NULL,

    CONSTRAINT "AccountBank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurposeAccountBank" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "masjid_id" INTEGER NOT NULL,

    CONSTRAINT "PurposeAccountBank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_id_key" ON "Payment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Kas_payment_id_key" ON "Kas"("payment_id");

-- AddForeignKey
ALTER TABLE "Kas" ADD CONSTRAINT "Kas_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_masjid_id_fkey" FOREIGN KEY ("masjid_id") REFERENCES "Masjids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountBank" ADD CONSTRAINT "AccountBank_masjid_id_fkey" FOREIGN KEY ("masjid_id") REFERENCES "Masjids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountBank" ADD CONSTRAINT "AccountBank_purpose_id_fkey" FOREIGN KEY ("purpose_id") REFERENCES "PurposeAccountBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurposeAccountBank" ADD CONSTRAINT "PurposeAccountBank_masjid_id_fkey" FOREIGN KEY ("masjid_id") REFERENCES "Masjids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
