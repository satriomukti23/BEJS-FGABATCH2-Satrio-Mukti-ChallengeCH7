/*
  Warnings:

  - You are about to drop the column `image` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "Bukti_Order" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Bukti_Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foto_product" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "foto_product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bukti_Order" ADD CONSTRAINT "Bukti_Order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foto_product" ADD CONSTRAINT "foto_product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
