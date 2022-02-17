import {prisma} from '../../prisma/index'
import {sign } from 'jsonwebtoken'

class LoginService{
    async execute(user:string, pass:string){

        let token

        const result = await prisma.login.findFirst({
            where:{
                user:user,
                password:pass
            }
        })

        if(!result){
            throw new Error('Email/Password Incorrect')  
        }
        
        token = sign({
            id: result.id,
        },"c094a4ad8a548c26dd6957247edde900",{
            expiresIn:"1d"
        })

        return token

    }
}
export{LoginService}