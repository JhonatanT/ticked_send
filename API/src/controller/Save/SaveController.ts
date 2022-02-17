import {Request, Response} from 'express' 
import { SaveService } from '../../service/Save/SaveService';

class SaveController{
    async handle(request:Request, response:Response){

        const {page} = request.body;

        const saveService = new SaveService();

        const saveArquivo = await saveService.execute(page)

        return response.status(200).json({ message: saveArquivo, file:request.file })

    }
}
export {SaveController}