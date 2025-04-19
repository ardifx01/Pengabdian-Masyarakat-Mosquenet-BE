/*
  Warnings:

  - Made the column `outcomes_id` on table `Assets` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Assets" DROP CONSTRAINT "Assets_outcomes_id_fkey";

-- AlterTable
ALTER TABLE "Assets" ALTER COLUMN "outcomes_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "Assets_outcomes_id_fkey" FOREIGN KEY ("outcomes_id") REFERENCES "Outcomes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
