/*
  Warnings:

  - You are about to drop the `DeliveryAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `DeliveryAddress` DROP FOREIGN KEY `DeliveryAddress_city_id_fkey`;

-- DropForeignKey
ALTER TABLE `DeliveryAddress` DROP FOREIGN KEY `DeliveryAddress_district_id_fkey`;

-- DropForeignKey
ALTER TABLE `DeliveryAddress` DROP FOREIGN KEY `DeliveryAddress_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `DeliveryAddress` DROP FOREIGN KEY `DeliveryAddress_ward_id_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_user_id_fkey`;

-- DropTable
DROP TABLE `DeliveryAddress`;

-- DropTable
DROP TABLE `Transaction`;

-- CreateTable
CREATE TABLE `delivery_addresses` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `city_id` VARCHAR(191) NOT NULL,
    `district_id` VARCHAR(191) NOT NULL,
    `ward_id` VARCHAR(191) NOT NULL,
    `detail` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `type` ENUM('ADD_MOMO', 'ADD_BANK', 'ADD_PAYPAL', 'MINUS_MOMO', 'MINUS_BANK', 'MINUS_PAYPAL') NOT NULL,
    `amount` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `transaction_code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `delivery_addresses` ADD CONSTRAINT `delivery_addresses_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery_addresses` ADD CONSTRAINT `delivery_addresses_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `city_reference`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery_addresses` ADD CONSTRAINT `delivery_addresses_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `district_reference`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery_addresses` ADD CONSTRAINT `delivery_addresses_ward_id_fkey` FOREIGN KEY (`ward_id`) REFERENCES `ward_reference`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
