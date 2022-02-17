import {Request, Response} from 'express' 
import { SendWhatsappService } from '../../service/Whatsapp/SendWhatsappService';

class SendWhatsappController{
    async handle(request:Request, response:Response){

        const {msg, page} = request.body;

        const sendWhatsappService = new SendWhatsappService();

        const senEmail = await sendWhatsappService.execute(msg,page)

        return response.status(200).json(senEmail)

    }
}
export {SendWhatsappController}