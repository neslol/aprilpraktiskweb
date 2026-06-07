-- CreateTable
CREATE TABLE `Page` (
    `path` VARCHAR(191) NOT NULL,
    `pageData` JSON NOT NULL,
    `creationDate` DATETIME(3) NOT NULL,
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`path`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
