/*
  Warnings:

  - You are about to drop the `producto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `producto`;

-- CreateTable
CREATE TABLE `Productos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Productos_path_key`(`path`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
