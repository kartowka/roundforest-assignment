-- CreateTable
CREATE TABLE "seller_product" (
    "asin" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "seller_name" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_link" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "seller_product_asin_key" ON "seller_product"("asin");
