-- CreateEnum
CREATE TYPE "spreadsheet_status" AS ENUM ('Processando', 'Concluído', 'Falhou');

-- CreateTable
CREATE TABLE "spreadsheets" (
    "id" VARCHAR(40) NOT NULL,
    "name" VARCHAR(35) NOT NULL,
    "processing_status" "spreadsheet_status" DEFAULT 'Processando',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spreadsheets_pkey" PRIMARY KEY ("id")
);
