/*
  Warnings:

  - The required column `id` was added to the `accounts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("id");
