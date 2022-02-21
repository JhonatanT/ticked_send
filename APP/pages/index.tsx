import styles from './home.module.scss'
import './home.module.scss'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext'
import { parseCookies } from 'nookies'
import Router from 'next/router'
import Swal from 'sweetalert2'

import React, { useState } from 'react'

export default function Homes() {
  const { register, handleSubmit } = useForm();
  const { Logar } = useContext(AuthContext)

  async function handleSign(data: { usuario: any; senha: any }) {
    

    if (data.usuario == '' || data.senha == '') {

      return (
        Swal.fire(
          'Todos os campos DEVEM SER PREENCHIDOS',
          'Algum campo esta vazio',
          'error'
        )
      )

    }

    //lugar onde mostra se falhou a autenticação ou n
    try {
      await Logar(data)
    }
    catch (e) {
      console.log(e)
      if (e.request.response ==  '{"error":"Email/Password Incorrect"}') {
        return (
          Swal.fire(
            'Usuario ou senha INCORRETOS',
            'O usuario ou senha digitado estão(a) incorretos',
            'error'
          )
        )
      }
      else {
        return (
          Swal.fire(
            'ALGO DEU ERRADO',
            'Algo deu errado, aperte F5 ou atualize a pagina, se o problema persistir entre em contato com um ADMIN',
            'error'
          )
        )
      }
    };
  }
  
    const{ ['token']:token }= parseCookies()
    if(token){
      Router.push('/Upload')
      return (
        <div>
          <p>LOGADO</p>
        </div>
      )
    }
    else{ 

    return (
      
      <div className={styles.pageauth}>

        <div className={styles.login}>
            <div className={styles.login_logo}>
                <img
                    src="/account.png"
                    alt="MdLockLogin App"
                />
            </div>
            <form className={styles.login_right} onSubmit={handleSubmit(handleSign)} >
              
                <h1>Entrar</h1>
                <label htmlFor="inp" className={styles.inp}>
                  <input 
                    type="text" 
                    id="inp" 
                    {...register('usuario')}
                    placeholder="&nbsp;
                    
                  "/>
                  <span className={styles.label}>Usuario</span>
                  <span className={styles.focus_bg}></span>
                  
                </label>
                
                <label htmlFor="inp" className={styles.inp}>
                  <input 
                    type="password" 
                    id="inp" 
                    {...register('senha')}
                    placeholder="&nbsp;
                    
                  "/>
                  <span className={styles.label}>Senha</span>
                  <span className={styles.focus_bg}></span>
                  
                </label>

                <button type="submit">
                    Entrar
                </button>

            </form>
        </div>

        </div>
    )
  }
}