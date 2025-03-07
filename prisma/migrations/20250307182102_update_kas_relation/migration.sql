-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "account_bank_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_account_bank_id_fkey" FOREIGN KEY ("account_bank_id") REFERENCES "AccountBank"("id") ON DELETE SET NULL ON UPDATE CASCADE;
