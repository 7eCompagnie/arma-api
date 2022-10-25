/*
  Warnings:

  - Added the required column `campaignId` to the `Operation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Operation` ADD COLUMN `campaignId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Campaign` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `summary` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Operation` ADD CONSTRAINT `Operation_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
