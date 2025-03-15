-- CreateEnum
CREATE TYPE "ResearchInternOption" AS ENUM ('YES', 'NO', 'MAYBE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prof" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "website" TEXT,
    "gscholar" TEXT,
    "qualification" TEXT NOT NULL,
    "degreeYear" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "teachingExp" DOUBLE PRECISION NOT NULL,
    "researchExp" DOUBLE PRECISION NOT NULL,
    "researchInterns" "ResearchInternOption" NOT NULL DEFAULT 'MAYBE',
    "cvUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prof_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "topics" TEXT[],
    "stipend" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "mode" TEXT NOT NULL,
    "eligibility" TEXT NOT NULL,
    "prerequisites" TEXT NOT NULL,
    "students" TEXT[],
    "approved" TEXT[],
    "rejected" TEXT[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Prof_email_key" ON "Prof"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Prof_uid_key" ON "Prof"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");
