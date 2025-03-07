-- AlterTable
ALTER TABLE "ActivityInformations" ADD COLUMN     "video_documentation" TEXT,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "document" DROP NOT NULL;
