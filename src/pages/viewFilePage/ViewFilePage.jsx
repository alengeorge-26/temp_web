import Navbar from "../../components/navbar/Navbar"
import styles from './viewfilepage.module.css'
import ViewFile from "../../components/viewFile/ViewFile"

const ViewFilePage = () => {
  
  return (
    <div className={styles.parentViewFilePageConatiner}>
      <Navbar />
      <div className={styles.viewFilePageContainer}>
        <ViewFile />
      </div>
    </div>
  )
}

export default ViewFilePage