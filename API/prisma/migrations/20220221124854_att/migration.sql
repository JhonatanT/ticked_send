BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[email_user] ADD [order] INT NOT NULL IDENTITY(1,1);

-- AlterTable
ALTER TABLE [dbo].[telefone_user] ADD [order] INT NOT NULL IDENTITY(1,1);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
