import FileUploader from "../../components/fileUploader/FileUploader"
import { Link } from "react-router-dom"
import styles from "./fileuploadpage.module.css"
import Navbar from "../../components/navbar/Navbar"

const FileUploadPage = () => {
  return (
    <>
      <Navbar/>
      <div className={styles.homeContainer}>
          <h1>Page to upload files</h1>
          <FileUploader />
          <li style={{listStyleType: "none"}}><Link to="/">Home</Link></li>
      </div>
    </>
  )
}

export default FileUploadPage;