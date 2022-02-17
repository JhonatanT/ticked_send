import "../styles/global.scss"
import styles from "../styles/app.module.scss"
import { AuthProvider } from '../contexts/AuthContext'
import { Navbar } from '../components/Menu/Navbar'
import "bootstrap/dist/css/bootstrap.css";



function MyApp({ Component, pageProps }) {

  return (

      <div className={styles.wrapper}>
        <main>
          <AuthProvider>
          <Navbar />
              <Component {...pageProps} />
          </AuthProvider>
        </main>
      </div>

  )
}

export default MyApp
