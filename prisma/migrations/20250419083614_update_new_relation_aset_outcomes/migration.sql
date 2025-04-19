-- DropForeignKey
ALTER TABLE "Assets" DROP CONSTRAINT "Assets_outcomes_id_fkey";

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "Assets_outcomes_id_fkey" FOREIGN KEY ("outcomes_id") REFERENCES "Outcomes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
