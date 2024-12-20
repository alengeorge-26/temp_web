import FolderUploader from "../../components/folderUploader/FolderUploader"
import styles from "./folderuploadpage.module.css"
import Navbar from "../../components/navbar/Navbar";

const FolderUploadPage = () => {
  return (
    <div className={styles.parentFUConatiner}>
      <Navbar />
      <div className={styles.homeContainer}>
          <FolderUploader />
      </div>
    </div>
  )
}

export default FolderUploadPage;