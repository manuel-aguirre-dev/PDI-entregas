-- CreateTable
CREATE TABLE `Producto` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Producto_path_key`(`path`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
