-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "ceatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "ceatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "invalid_token" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "ceatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invalid_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invalid_token_token_key" ON "invalid_token"("token");
