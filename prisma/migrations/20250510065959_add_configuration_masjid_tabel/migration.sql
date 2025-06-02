/*
  Warnings:

  - You are about to drop the `Animal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnimalsQurban` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QurbanPayment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnimalsQurban" DROP CONSTRAINT "AnimalsQurban_animal_id_fkey";

-- DropForeignKey
ALTER TABLE "AnimalsQurban" DROP CONSTRAINT "AnimalsQurban_masjid_id_fkey";

-- DropForeignKey
ALTER TABLE "QurbanPayment" DROP CONSTRAINT "QurbanPayment_animal_id_fkey";

-- DropForeignKey
ALTER TABLE "QurbanPayment" DROP CONSTRAINT "QurbanPayment_payment_id_fkey";

-- DropTable
DROP TABLE "Animal";

-- DropTable
DROP TABLE "AnimalsQurban";

-- DropTable
DROP TABLE "QurbanPayment";

-- DropEnum
DROP TYPE "QurbanAnimalsName";

-- CreateTable
CREATE TABLE "Configuration" (
    "id" SERIAL NOT NULL,
    "masjid_id" INTEGER NOT NULL,
    "is_article_used" BOOLEAN NOT NULL,
    "is_donation_used" BOOLEAN NOT NULL,
    "is_activity_outcomes_connected" BOOLEAN NOT NULL,
    "is_asset_outcomes_connected" BOOLEAN NOT NULL,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Configuration_masjid_id_key" ON "Configuration"("masjid_id");
