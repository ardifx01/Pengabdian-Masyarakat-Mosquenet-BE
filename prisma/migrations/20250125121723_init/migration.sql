-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "password" TEXT NOT NULL,
    "telp" VARCHAR(20) NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "master_id" INTEGER NOT NULL,
    "jamaah_id" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admins" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Masters" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Masters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jamaahs" (
    "id" SERIAL NOT NULL,
    "masjid_id" INTEGER NOT NULL,

    CONSTRAINT "Jamaahs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Masjids" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "subdistrict_id" INTEGER NOT NULL,
    "cityorregency_id" INTEGER NOT NULL,
    "province_id" INTEGER NOT NULL,

    CONSTRAINT "Masjids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incomes" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "masjid_id" INTEGER NOT NULL,
    "source_id" INTEGER NOT NULL,

    CONSTRAINT "Incomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncomeSources" (
    "id" SERIAL NOT NULL,
    "masjid_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "IncomeSources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Outcomes" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reason_id" INTEGER NOT NULL,
    "masjid_id" INTEGER NOT NULL,

    CONSTRAINT "Outcomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutcomeReason" (
    "id" SERIAL NOT NULL,
    "masjid_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "OutcomeReason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityInformations" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pic" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "masjid_id" INTEGER NOT NULL,

    CONSTRAINT "ActivityInformations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "masjid_id" INTEGER NOT NULL,

    CONSTRAINT "Assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kas" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL,
    "amount" INTEGER NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "masjid_id" INTEGER NOT NULL,

    CONSTRAINT "Kas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_telp_key" ON "Users"("telp");

-- CreateIndex
CREATE UNIQUE INDEX "Users_admin_id_key" ON "Users"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_master_id_key" ON "Users"("master_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_jamaah_id_key" ON "Users"("jamaah_id");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_master_id_fkey" FOREIGN KEY ("master_id") REFERENCES "Masters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_jamaah_id_fkey" FOREIGN KEY ("jamaah_id") REFERENCES "Jamaahs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jamaahs" ADD CONSTRAINT "Jamaahs_masjid_id_fkey" FOREIGN KEY ("masjid_id") REFERENCES "Masjids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incomes" ADD CONSTRAINT "Incomes_masjid_id_fkey" FOREIGN KEY ("masjid_id") REFERENCES "Masjids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incomes" ADD CONSTRAINT "Incomes_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "IncomeSources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeSources" ADD CONSTRAINT "IncomeSources_masjid_id_fkey" FOREIGN KEY ("masjid_id") REFERENCES "Masjids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outcomes" ADD CONSTRAINT "Outcomes_masjid_id_fkey" FOREIGN KEY ("masjid_id") REFERENCES "Masjids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outcomes" ADD CONSTRAINT "Outcomes_reason_id_fkey" FOREIGN KEY ("reason_id") REFERENCES "OutcomeReason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutcomeReason" ADD CONSTRAINT "OutcomeReason_masjid_id_fkey" FOREIGN KEY ("masjid_id") REFERENCES "Masjids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityInformations" ADD CONSTRAINT "ActivityInformations_masjid_id_fkey" FOREIGN KEY ("masjid_id") REFERENCES "Masjids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "Assets_masjid_id_fkey" FOREIGN KEY ("masjid_id") REFERENCES "Masjids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kas" ADD CONSTRAINT "Kas_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
