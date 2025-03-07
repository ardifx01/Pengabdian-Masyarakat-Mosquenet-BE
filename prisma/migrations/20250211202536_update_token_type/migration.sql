/*
  Warnings:

  - A unique constraint covering the columns `[tokenVerification]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_tokenVerification_key" ON "Users"("tokenVerification");
