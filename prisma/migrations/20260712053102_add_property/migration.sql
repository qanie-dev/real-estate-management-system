/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `propertyType` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `purpose` on the `Property` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `Decimal(12,2)`.
  - You are about to drop the `PropertyCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertyImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `areaUnit` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyImage" DROP CONSTRAINT "PropertyImage_propertyId_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "categoryId",
DROP COLUMN "propertyType",
DROP COLUMN "purpose",
ADD COLUMN     "areaUnit" TEXT NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "image2" TEXT,
ADD COLUMN     "image3" TEXT,
ADD COLUMN     "image4" TEXT,
ADD COLUMN     "image5" TEXT,
ADD COLUMN     "project" TEXT,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "status" SET DEFAULT 'Available';

-- DropTable
DROP TABLE "PropertyCategory";

-- DropTable
DROP TABLE "PropertyImage";
