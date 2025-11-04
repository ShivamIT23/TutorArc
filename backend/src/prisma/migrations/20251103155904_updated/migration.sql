-- CreateTable
CREATE TABLE `LiveSession` (
    `id` VARCHAR(191) NOT NULL,
    `unique_id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `userurl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `LiveSession_unique_id_key`(`unique_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
