import LoginBox from "../../components/loginBox/LoginBox"
import styles from './loginpage.module.css'
import Navbar from "../../components/navbar/Navbar"

const LoginPage = () => {
  
  return (
    <div className={styles.parentLoginpageConatiner}>
      <Navbar/>
      <div className={styles.loginpageContainer}>
        <h1>Login</h1>
        <LoginBox/>
      </div>
    </div>
  )
}

export default LoginPage