/*
  Warnings:

  - You are about to drop the column `isPaid` on the `ppdb` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ppdb` DROP COLUMN `isPaid`,
    ADD COLUMN `isVerified` BOOLEAN NOT NULL DEFAULT false;
