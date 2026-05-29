/*
  Warnings:

  - The values [RH] on the enum `TicketChannel` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `text` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `description` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TicketChannel_new" AS ENUM ('OUVIDORIA', 'SAC', 'SUPORTE_TECNICO', 'FINANCEIRO', 'FORA_DO_ESCOPO', 'PENDENTE_REVISAO');
ALTER TABLE "Ticket" ALTER COLUMN "channel" TYPE "TicketChannel_new" USING ("channel"::text::"TicketChannel_new");
ALTER TYPE "TicketChannel" RENAME TO "TicketChannel_old";
ALTER TYPE "TicketChannel_new" RENAME TO "TicketChannel";
DROP TYPE "public"."TicketChannel_old";
COMMIT;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "text",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
