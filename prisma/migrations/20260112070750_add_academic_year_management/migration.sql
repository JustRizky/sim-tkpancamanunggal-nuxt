-- AlterTable
ALTER TABLE `ppdb` ADD COLUMN `academicYear` VARCHAR(191) NOT NULL DEFAULT '2024/2025',
    ADD COLUMN `semester` VARCHAR(191) NOT NULL DEFAULT 'ganjil';

-- CreateTable
CREATE TABLE `AcademicYear` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `year` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AcademicYear_year_key`(`year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
