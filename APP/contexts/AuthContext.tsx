//Classe que faz a atenticação do usuario
import { createContext, useEffect, useState } from "react"
import { api } from "../services/api";
import Swal from "sweetalert2";
import { parseCookies, setCookie } from "nookies";
import Router from 'next/router'
type User = {
    id: string,
}
type Upload_boletoType = {
    file: any;
    page: string;
    msg?: string;
}

type LogarType = {
    usuario: string;
    senha: string;
}

type AuthContextType = {
    isAthenticated: boolean;
    Logar: (data: LogarType) => Promise<void>;
    Upload_boleto: (data: Upload_boletoType) => Promise<void>;
    upload_bd: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {

    const [user, setUser] = useState<User | null>(null);

    const isAthenticated = !user;

    useEffect(() => {

        const { 'token': token } = parseCookies();

        if (token) {
            //criar uma função que retorna os dados do usuario logado a partir desse id
            const { 'SetTimeid': id_usu } = parseCookies();

            //essa função tinha que pegar os dados do usuario pelo token, porem eu n sei ainda
            //PegaUsu(id_usu).then((response: { user: any; }) => setUser(response.user));
        }
    }, [])

    async function Logar({ usuario, senha }: LogarType) {

        const { data } = await api.post('/login', {
            user: usuario,
            pass: senha
        });
        console.log(data);

        setCookie(undefined, 'token', data, {
            maxAge: 30 * 30 * 1,//30min
        })

        api.defaults.headers.authorization = `Bearer ${data}`

        Router.push('/Upload',);
    }

    async function Upload_boleto({ file, page, msg }: Upload_boletoType) {


        Swal.fire({
            title: 'Deseja Enviar os boletos selecionados?',
            text: "Enviar boletos?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim'
        }).then((result) => {
            
            if (result.isConfirmed) {

                let timerInterval
                Swal.fire({
                title: 'Carregando Boletos no servidor',
                html: '<h1>NÃO FECHAR ESPERE TERMINAR</h2> <br/>Enviado Email para os clientes <b></b>',
                didOpen: async () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')

                    const formData = new FormData();
                    formData.append("file", file[0]);
                    formData.append("page", page);
            
                    const save_boleto = await api.post('/saveArquivo', formData,{
                        headers: {
                            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                        }
                    })
                    console.log(save_boleto.data);
                    if(save_boleto.status == 200){

                        const sendWhatsapp = await api.post('/sendWhatsapp',{
                            msg: msg,
                            page: page
                        })

                        if(sendWhatsapp.status == 200){

                            const sendEmail = await api.post('/sendEmail',{
                                msg: msg,
                                page: page
                            })

                            if(sendEmail.status == 200){
                        
                                b.textContent = Swal.getTimerLeft()

                                clearInterval(timerInterval)
                                
                                return (
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Envio de Boletos, Concluido',
                                        showConfirmButton: false,
                                        timer: 4000
                                    })
                                )
                            }
                            else{
                                Swal.fire(
                                    'Senha Incorreta',
                                    'As senhas estão diferentes',
                                    'error'
                                )
                            }
                        }
                        else{
                            Swal.fire(
                                'Senha Incorreta',
                                'As senhas estão diferentes',
                                'error'
                            )
                        }
                }
                else{
                    Swal.fire(
                        'Senha Incorreta',
                        'As senhas estão diferentes',
                        'error'
                    )
                }
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log(result);
                }
            })
        }
        });

        

    }

    async function upload_bd() {
        
        Swal.fire({
            title: 'Deseja Atualizar os dados dos clientes?',
            text: "Atualizar dados?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim'
        }).then(async (result) => {
            
            if (result.isConfirmed) {
            
                const data  = await api.post('/upload');
                console.log(data)
                if(data.status === 200){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Dados dos Clientes Atualizados com sucesso',
                        showConfirmButton: false,
                        timer: 4000
                    })
                }
                else{
                    Swal.fire(
                        'Algo deu errado',
                        'Algo deu errado no servidor',
                        'error'
                    )
                }
            }
        });

    }

    return (
        <AuthContext.Provider value={{ Upload_boleto,Logar,isAthenticated, upload_bd }}>
            {children}
        </AuthContext.Provider>
    )
}
