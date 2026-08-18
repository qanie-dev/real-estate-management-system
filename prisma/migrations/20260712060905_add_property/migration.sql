/*
  Warnings:

  - You are about to drop the column `areaUnit` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `image2` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `image3` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `image4` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `image5` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `project` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "areaUnit",
DROP COLUMN "image2",
DROP COLUMN "image3",
DROP COLUMN "image4",
DROP COLUMN "image5",
DROP COLUMN "project",
ALTER COLUMN "area" SET DATA TYPE TEXT;
