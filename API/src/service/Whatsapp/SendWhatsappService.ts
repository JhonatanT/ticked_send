import { client } from "../../server";
import {prisma} from '../../prisma/index'
import { MessageMedia } from "whatsapp-web.js";
 
class SendWhatsappService{
    async execute(msg:string, page:string){
        const date_now = new Date().getDay()+'/'+new Date().getMonth()+'/'+new Date().getFullYear()

        const result = await prisma.telefone_User.findMany({
            select:{
                id_pessoa:true,
                numero_telefone:true
            }
        })
        
        for(var i=0; i < result.length; i++){
            const blt = MessageMedia.fromFilePath(`./Email/${page}/${result[i].id_pessoa}.pdf`)
            client.sendMessage(`5511${result[i].numero_telefone}@c.us`,`${msg} , Data: ${date_now}`)
            client.sendMessage(`5511${result[i].numero_telefone}@c.us`,blt)
        
        }

    }
}
export{SendWhatsappService}