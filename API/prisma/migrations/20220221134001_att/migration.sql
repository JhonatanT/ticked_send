/*
  Warnings:

  - You are about to drop the column `order` on the `email_user` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `telefone_user` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[email_user] DROP COLUMN [order];

-- AlterTable
ALTER TABLE [dbo].[telefone_user] DROP COLUMN [order];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
