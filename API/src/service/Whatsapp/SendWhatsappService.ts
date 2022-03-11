import { client } from "../../server";
import {prisma} from '../../prisma/index'
import { MessageMedia } from "whatsapp-web.js";
import { Prisma } from ".prisma/client";
 
interface user{
    length: any
    id_pessoa:any
    numero_telefone:any
}

class SendWhatsappService{
    async execute(msg:string, page:string){

        const date_now = new Date().getDay()+'/'+new Date().getMonth()+'/'+new Date().getFullYear()

        const result = await prisma.$queryRaw<user[]>(
            Prisma.sql`SELECT a.id_pessoa, a.numero_telefone FROM [DB_Hayashi_Boleto].[dbo].[telefone_user] a
            join [DB_Hayashi_Boleto].[dbo].[user] b on b.id_pessoa = a.id_pessoa
            where b.dia = ${page}`,
        )
        
        for(var i=0; i < result.length; i++){
            try{
                const blt = MessageMedia.fromFilePath(`./Email/${page}/${result[i].id_pessoa}.pdf`)
                client.sendMessage(`5511${result[i].numero_telefone}@c.us`,`${msg} , Data: ${date_now}`)
                client.sendMessage(`5511${result[i].numero_telefone}@c.us`,blt)
                console.log(result[i].numero_telefone, ' ENVIADOS');
            }
            catch(e){
                console.log(e);
            }

            
        
        }

    }
}
export{SendWhatsappService}