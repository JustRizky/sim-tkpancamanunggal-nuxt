/*
  Warnings:

  - Added the required column `updatedAt` to the `Ppdb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Add column as nullable first
ALTER TABLE `ppdb` ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- Update existing rows to use createdAt as initial updatedAt value
UPDATE `ppdb` SET `updatedAt` = `createdAt`;

-- Now make it NOT NULL
ALTER TABLE `ppdb` MODIFY COLUMN `updatedAt` DATETIME(3) NOT NULL;
