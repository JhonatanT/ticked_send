import nodemailer from 'nodemailer'
import {prisma} from '../../prisma/index'
import dotenv from 'dotenv'
import fs from 'fs'
import {v4} from 'uuid'
import { Prisma } from "@prisma/client"

interface user{
    length: any
    id_pessoa:any
    email:any
}

interface email{
    msg:string;
    page:number;
    email_enviados?:[];
    email_não_enviados?:[];
    arquivo_com_problema?:[];
}
class SendEmailService{
    async execute({msg, page}:email){

        if(page != 5 && page != 20){
            return 'Informe uma data valida'
        }

        const Date_now = new Date().getDay()+'-'+new Date().getMonth()+'-'+new Date().getFullYear()+'_'+new Date().getMilliseconds()+v4();
        dotenv.config();

        let email=[]
        let email_incorrct=[]
        let arquivo_incorrct= []
        let user= process.env.EMAIL;
        let pass= process.env.PASS;
        let id_arquivo_inco: string[] = []

        const result = await prisma.$queryRaw<user[]>(
            Prisma.sql`SELECT a.id_pessoa, a.email FROM [DB_Hayashi_Boleto].[dbo].[email_user] a
            join [DB_Hayashi_Boleto].[dbo].[user] b on b.id_pessoa = a.id_pessoa
            where b.dia = ${page}`,
        )

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
                email.push(data.accepted)
                console.log('email para' ,result[i].email);
                
                fs.rename(`./Email/${page}/${result[i].id_pessoa}.pdf`, `./Email/Enviados/${result[i].id_pessoa}+${Date_now}.pdf`,() => {console.log('arquivo movido');});
               
            }
            catch(err:any){
                if(err.path){
                    arquivo_incorrct.push(`${result[i].id_pessoa}.pdf`)     
                }
                else{
                    email_incorrct.push(err.rejected[0]);
                    console.log(err.rejected[0]);
                }
            }
        }

        const dir = `./Email/${page}/`;
        let filenames = fs.readdirSync(dir);

        filenames.forEach(file => {
            id_arquivo_inco.push(file);
            fs.rename(`./Email/${page}/${file}`, `./Email/Enviados/${file}_id_arquivo_inco_+${Date_now}`,() => {console.log('arquivo errado');});
        });

        return {email_enviados:email, email_não_enviados: email_incorrct, arquivo_n_exist : arquivo_incorrct, id_incorrect: id_arquivo_inco}
    
    } 
}
export{SendEmailService}

