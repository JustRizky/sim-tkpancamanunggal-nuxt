/*
  Warnings:

  - You are about to drop the column `subtitle` on the `HeroSection` table. All the data in the column will be lost.
  - You are about to alter the column `image` on the `HeroSection` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - Added the required column `paragraph` to the `HeroSection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `HeroSection` DROP COLUMN `subtitle`,
    ADD COLUMN `paragraph` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL DEFAULT 1,
    MODIFY `image` VARCHAR(191) NOT NULL;
