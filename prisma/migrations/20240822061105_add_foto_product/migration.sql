-- CreateTable
CREATE TABLE "Foto_Product" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Foto_Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Foto_Product" ADD CONSTRAINT "Foto_Product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
