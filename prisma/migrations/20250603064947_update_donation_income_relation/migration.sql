/*
  Warnings:

  - A unique constraint covering the columns `[incomes_id]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Donation_incomes_id_key" ON "Donation"("incomes_id");

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_incomes_id_fkey" FOREIGN KEY ("incomes_id") REFERENCES "Incomes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
