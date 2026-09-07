/*
  Warnings:

  - You are about to drop the column `articleId` on the `streams` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "streams" DROP CONSTRAINT "streams_articleId_fkey";

-- DropIndex
DROP INDEX "streams_articleId_idx";

-- AlterTable
ALTER TABLE "streams" DROP COLUMN "articleId";

-- CreateTable
CREATE TABLE "_ArticleToStream" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ArticleToStream_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ArticleToStream_B_index" ON "_ArticleToStream"("B");

-- AddForeignKey
ALTER TABLE "_ArticleToStream" ADD CONSTRAINT "_ArticleToStream_A_fkey" FOREIGN KEY ("A") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToStream" ADD CONSTRAINT "_ArticleToStream_B_fkey" FOREIGN KEY ("B") REFERENCES "streams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
