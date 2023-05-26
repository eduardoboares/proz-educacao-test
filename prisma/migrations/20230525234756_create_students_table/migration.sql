-- CreateEnum
CREATE TYPE "civil_status" AS ENUM ('SOLTEIRO(A)', 'CASADO(A)');

-- CreateEnum
CREATE TYPE "gender_types" AS ENUM ('Masculino', 'Feminino');

-- CreateTable
CREATE TABLE "students" (
    "id" VARCHAR(40) NOT NULL,
    "name" VARCHAR(35) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "rg" VARCHAR(14) NOT NULL,
    "civil_status" "civil_status" NOT NULL,
    "gender" "gender_types" NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "students_cpf_key" ON "students"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "students_rg_key" ON "students"("rg");
