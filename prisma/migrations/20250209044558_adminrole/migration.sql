/*
  Warnings:

  - Changed the type of `role` on the `Admins` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('Ketua', 'Bendahara', 'Sekretaris', 'Marbot', 'Muadzin', 'Imam');

-- AlterTable
ALTER TABLE "Admins" DROP COLUMN "role",
ADD COLUMN     "role" "AdminRole" NOT NULL;
