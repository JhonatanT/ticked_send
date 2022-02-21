import styles from './home.module.scss'
import './home.module.scss'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../contexts/AuthContext'
import Swal from 'sweetalert2'
import React from 'react'
import { parseCookies } from 'nookies'

export default function Home(dado) {
  const { register, handleSubmit } = useForm();
  const { Upload_boleto } = useContext(AuthContext)

  async function handleSign(data: { file: any; page: any }) {

    if(data.file[0].name != data.page+'.zip'){
      return (
        Swal.fire(
          'Arquivo Incorreto',
          'Arquivo está com o nome ou tipo errado',
          'error'
        )
      )
    }
    else{
      try {
        await Upload_boleto(data)
      }
      catch (e) {
        console.log(e,'e')
      };
    }
  }

    return (
      <div className={styles.pageauth}>
        <div className={styles.login}>
            <div className={styles.login_logo}>
                <img
                    src="/login1.png"
                    alt="MdLockLogin App"
                />
            </div>
            <form className={styles.login_right} encType="multipart/form-data" onSubmit={handleSubmit(handleSign)} >
              
                <h1>Enviar Boleto</h1>
                <label className={styles.select}>
                  <h5>Selecione o arquivo</h5>
                  <input 
                  required
                  name="file"
                  type="file"
                    {...register('file')}
                    />
                </label>
                    <br />
                    <label className={styles.select}>
                    <h5>Selecione o Dia refente para enviar</h5>
                      <select id="slct" required {...register('page')}>
                        <option value="" disabled selected>Selecione 1 Dia</option>
                        <option value="5">Dia 05</option>
                        <option value="20">Dia 20</option>
                      </select>
                    </label>
                    <br />
                  <label className={styles.select}>
                    <h5>Digite a mensagem:</h5>
                    <textarea name="msg" cols={40} rows={2} required {...register('msg')}></textarea>
                  </label>
                  <br />
                <button type="submit">
                    Enviar
                </button>
            </form>
        </div>
        </div>
    )
}



export async function getServerSideProps(ctx) {

  const { ['token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props:{
      dado:'1'
    }
  }
}