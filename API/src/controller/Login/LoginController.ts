import {Request, Response} from 'express' 
import { LoginService } from '../../service/Login/LoginService';

class LoginController{
    async handle(request:Request, response:Response){

        const {user, pass} = request.body;

        const loginService = new LoginService();

        const sendToken = await loginService.execute(user, pass)

        return response.status(200).json(sendToken)

    }
}
export {LoginController}