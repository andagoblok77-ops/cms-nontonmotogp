-- CreateEnum
CREATE TYPE "AdsPublisher" AS ENUM ('adsterra', 'mgid', 'monetag');

-- AlterTable
ALTER TABLE "ad_links" ADD COLUMN     "adsPublisher" "AdsPublisher" NOT NULL DEFAULT 'adsterra',
ADD COLUMN     "scriptCode" TEXT;
