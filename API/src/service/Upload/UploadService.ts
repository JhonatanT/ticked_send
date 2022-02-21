import { Prisma } from "@prisma/client"
import { prisma } from "../../prisma"


class UploadService{
    async execute(){

        await prisma.email_User.deleteMany()
        await prisma.telefone_User.deleteMany()
        await prisma.user.deleteMany()

        const result = await prisma.$queryRaw<[]>(
            Prisma.sql`EXECUTE [dbo].[Update_Data]`,
        )

        return result
    }
}
export{UploadService}