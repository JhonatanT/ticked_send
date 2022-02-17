BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[email_user] (
    [id] NVARCHAR(1000) NOT NULL,
    [id_pessoa] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [email_user_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[telefone_user] (
    [id] NVARCHAR(1000) NOT NULL,
    [id_pessoa] NVARCHAR(1000) NOT NULL,
    [numero_telefone] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [telefone_user_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[user] (
    [id_pessoa] NVARCHAR(1000) NOT NULL,
    [tipopessoa] NVARCHAR(1000) NOT NULL,
    [tipodocumento] NVARCHAR(1000) NOT NULL,
    [cnpj_cpf] NVARCHAR(1000) NOT NULL,
    [nome_razao] NVARCHAR(1000) NOT NULL,
    [nomefantasia] NVARCHAR(1000) NOT NULL,
    [contato] NVARCHAR(1000) NOT NULL,
    [ie_rg] NVARCHAR(1000) NOT NULL,
    [cadastro] NVARCHAR(1000) NOT NULL,
    [diafaturamento] NVARCHAR(1000) NOT NULL,
    [valormensalidade] NVARCHAR(1000) NOT NULL,
    [situacao] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [user_pkey] PRIMARY KEY ([id_pessoa])
);

-- AddForeignKey
ALTER TABLE [dbo].[email_user] ADD CONSTRAINT [email_user_id_pessoa_fkey] FOREIGN KEY ([id_pessoa]) REFERENCES [dbo].[user]([id_pessoa]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[telefone_user] ADD CONSTRAINT [telefone_user_id_pessoa_fkey] FOREIGN KEY ([id_pessoa]) REFERENCES [dbo].[user]([id_pessoa]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
