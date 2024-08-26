-- DropForeignKey
ALTER TABLE "Bukti_Order" DROP CONSTRAINT "Bukti_Order_orderId_fkey";

-- AddForeignKey
ALTER TABLE "Bukti_Order" ADD CONSTRAINT "Bukti_Order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
