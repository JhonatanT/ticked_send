import {Request, Response} from 'express' 
import { UploadService } from '../../service/Upload/UploadService';

class UploadController{
    async handle(request:Request, response:Response){

        const uploadService = new UploadService();

        const saveArquivo = await uploadService.execute()

        return response.status(200).json(saveArquivo)

    }
}
export {UploadController}