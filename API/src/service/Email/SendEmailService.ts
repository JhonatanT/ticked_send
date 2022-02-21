import nodemailer from 'nodemailer'
import {prisma} from '../../prisma/index'
import dotenv from 'dotenv'
import fs from 'fs'
import {v4} from 'uuid'

class SendEmailService{
    async execute(msg:string, page:number){
        if(page != 5 && page != 20){
            return 'Informe uma data valida'
        }

        const Date_now = new Date().getDay()+'-'+new Date().getMonth()+'-'+new Date().getFullYear()+'_'+new Date().getMilliseconds()+v4();
        dotenv.config();

        let email=[]
        let email_incorrct=[]
        let user= process.env.EMAIL;
        let pass= process.env.PASS;

        const result = await prisma.email_User.findMany({
            select:{
                id_pessoa:true,
                email:true
            }
        })

        for(var i=0; i < result.length; i++){

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                auth:{user, pass}
            })
            
            try{
                const data = await transporter.sendMail({
                    from:user,
                    to:result[i].email,
                    subject : "Pagamento Hayashi",
                    text: `${msg}`,
                    attachments: [{
                        filename: `${result[i].id_pessoa}.pdf`,
                        path: `./Email/${page}/${result[i].id_pessoa}.pdf`
                      }]
                })
                email.push(data.response)

                fs.rename(`./Email/${page}/${result[i].id_pessoa}.pdf`, `./Email/Enviados/${result[i].id_pessoa}+${Date_now}.pdf`, function(err){
                    if(err){
                        throw err;	
                    }else{
                        //console.log('Arquivo renomeado');
                    }
                });
    
            }
            catch(e:any){
                email_incorrct.push(e)
                return email_incorrct
            }
        }

        return email
    
    }
}
export{SendEmailService}