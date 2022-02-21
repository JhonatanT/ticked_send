import { Prisma } from "@prisma/client"
import { prisma } from "../../prisma"


class UploadService{
    async execute(){

        const result = await prisma.$queryRaw<[]>(
            Prisma.sql`SELECT*FROM [DB_Hayashi_Boleto].[dbo].[login]`
        )
            console.log(result)
        return result
    }
}
export{UploadService}