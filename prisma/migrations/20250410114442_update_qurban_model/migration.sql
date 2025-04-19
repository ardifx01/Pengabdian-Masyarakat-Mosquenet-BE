/*
  Warnings:

  - You are about to drop the column `amount` on the `AnimalsQurban` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `AnimalsQurban` table. All the data in the column will be lost.
  - You are about to drop the column `sell` on the `AnimalsQurban` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[animal_id]` on the table `AnimalsQurban` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `animal_id` to the `AnimalsQurban` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_per_kilo` to the `AnimalsQurban` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_received` to the `QurbanPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `QurbanPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qurban_code` to the `QurbanPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `QurbanPayment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QurbanAnimalsName" AS ENUM ('Unta', 'Sapi', 'Domba', 'Kambing');

-- AlterTable
ALTER TABLE "AnimalsQurban" DROP COLUMN "amount",
DROP COLUMN "name",
DROP COLUMN "sell",
ADD COLUMN     "animal_id" INTEGER NOT NULL,
ADD COLUMN     "price_per_kilo" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "QurbanPayment" ADD COLUMN     "is_received" BOOLEAN NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "qurban_code" TEXT NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "name" "QurbanAnimalsName" NOT NULL,
    "amount" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnimalsQurban_animal_id_key" ON "AnimalsQurban"("animal_id");

-- AddForeignKey
ALTER TABLE "AnimalsQurban" ADD CONSTRAINT "AnimalsQurban_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
