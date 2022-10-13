/*
  Warnings:

  - A unique constraint covering the columns `[discord_identifier]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discord_discriminator` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discord_identifier` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discord_username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `discord_discriminator` VARCHAR(191) NOT NULL,
    ADD COLUMN `discord_identifier` VARCHAR(191) NOT NULL,
    ADD COLUMN `discord_username` VARCHAR(191) NOT NULL,
    ALTER COLUMN `updatedAt` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `user_discord_identifier_key` ON `user`(`discord_identifier`);
