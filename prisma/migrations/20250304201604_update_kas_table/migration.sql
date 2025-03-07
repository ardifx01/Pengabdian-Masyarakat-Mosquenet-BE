/*
  Warnings:

  - Added the required column `qr_string` to the `Kas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference_id` to the `Kas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Kas` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Kas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'PENDING');

-- AlterTable
ALTER TABLE "Kas" ADD COLUMN     "qr_string" TEXT NOT NULL,
ADD COLUMN     "reference_id" TEXT NOT NULL,
ADD COLUMN     "sku" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "PaymentStatus" NOT NULL;
