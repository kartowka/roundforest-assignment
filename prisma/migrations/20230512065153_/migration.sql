/*
  Warnings:

  - A unique constraint covering the columns `[asin,locale]` on the table `seller_product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "seller_product_asin_key";

-- AlterTable
ALTER TABLE "seller_product" ADD CONSTRAINT "seller_product_pkey" PRIMARY KEY ("asin", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "seller_product_asin_locale_key" ON "seller_product"("asin", "locale");
