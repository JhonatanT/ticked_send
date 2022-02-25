import {Request, Response} from 'express' 
import { SendEmailService } from '../../service/Email/SendEmailService';

class SendEmailController{
    async handle(request:Request, response:Response){

        const {msg, page} = request.body;

        const sendEmailService = new SendEmailService();

        const senEmail = await sendEmailService.execute({msg, page})
        
        return response.status(200).json(senEmail)

    }
}
export {SendEmailController}