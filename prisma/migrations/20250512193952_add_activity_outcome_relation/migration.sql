-- CreateTable
CREATE TABLE "ActivityOutcomes" (
    "id" SERIAL NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "outcome_id" INTEGER NOT NULL,

    CONSTRAINT "ActivityOutcomes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivityOutcomes_outcome_id_key" ON "ActivityOutcomes"("outcome_id");

-- AddForeignKey
ALTER TABLE "ActivityOutcomes" ADD CONSTRAINT "ActivityOutcomes_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "ActivityInformations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityOutcomes" ADD CONSTRAINT "ActivityOutcomes_outcome_id_fkey" FOREIGN KEY ("outcome_id") REFERENCES "Outcomes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
