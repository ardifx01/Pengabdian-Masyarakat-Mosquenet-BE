/*
  Warnings:

  - A unique constraint covering the columns `[outcomes_id]` on the table `Assets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `outcomes_id` to the `Assets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assets" ADD COLUMN     "outcomes_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Assets_outcomes_id_key" ON "Assets"("outcomes_id");

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "Assets_outcomes_id_fkey" FOREIGN KEY ("outcomes_id") REFERENCES "Outcomes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
