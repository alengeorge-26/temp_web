import styles from './homepage.module.css'
import Navbar from "../../components/navbar/Navbar"
import home from './home.jpg'

const HomePage = () => {

  return (
    <div className={styles.parentHomeConatiner}>
      <Navbar/>
      <div className={styles.homeContainer}>
        <div className={styles.textContent}>
          <h1>Welcome</h1>
          <p>Upload medical reports and get the ICD codes.</p>
          <button>Get Started</button>
        </div>
        <div className={styles.homeImage}> 
            <img src={home}/>
        </div>
      </div>
    </div>
  )
}

export default HomePage