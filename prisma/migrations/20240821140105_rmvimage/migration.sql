/*
  Warnings:

  - You are about to drop the `Bukti_Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `foto_product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bukti_Order" DROP CONSTRAINT "Bukti_Order_orderId_fkey";

-- DropForeignKey
ALTER TABLE "foto_product" DROP CONSTRAINT "foto_product_productId_fkey";

-- DropTable
DROP TABLE "Bukti_Order";

-- DropTable
DROP TABLE "foto_product";
