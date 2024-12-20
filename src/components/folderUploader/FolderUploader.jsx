import { useState,useContext, useEffect } from 'react'
import styles from './folderuploader.module.css'
import icd_server from '../../url/icd_server';
import JSZip from 'jszip';
import { UserContext } from '../../contextapi.js/user_context';
import FolderLoadAnimation from '../folderLoadAnimation/FolderLoadAnimation';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

const FolderUploader = () => {
  const [folderFiles, setFolderFiles] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [success, setSuccess] = useState(false);
  const [upload, setUpload] = useState(false);
  const [alert, setAlert] = useState(false);

  const [successData, setSuccessData] = useState([]);
  const [failedData, setFailedData] = useState([]);

  const {user_id} = useContext(UserContext);
 
  const handleFolderSelect = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    setFolderFiles(files);

    if (files.length > 0) {
      const firstFilePath = files[0].webkitRelativePath; 
      const folderPath = firstFilePath.split('/')[0];
      setFolderName(folderPath);
    }
  };

  const handleFolderUpload = async(e) => {
    e.preventDefault();

    if(folderFiles.length == 0){
      setAlert(true);
      return;
    }

    setUpload(true)
    setSuccess(false)

    const zip = new JSZip();
    folderFiles.forEach((file) => {
      zip.file(file.name, file);
    })

    const blob = await zip.generateAsync({ type: "blob" });

    const formData = new FormData();
    formData.append('user_id',user_id);
    formData.append('folder', blob, folderName);

    try{
      const res = await icd_server.post('/file_api/upload_folder/',formData,{
        headers:{
            'Content-Type':'multipart/form-data',
            'Authorization':'Bearer '+localStorage.getItem('access_token')
        }
      });
      setSuccess(res.data.success);
      setUpload(false);
    }catch{
      setUpload(false);
      alert('There was an error while uploading the folder. Please try again.');
    }
  }

  useEffect(() => {
    const fetch_from_cache = async () => {
      try{
        const res = await icd_server.get('/file_api/test_files/',
        {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
        });

        setSuccessData(res.data.file_data_success);
        setFailedData(res.data.file_data_failed);
      }catch{
        alert('The files could not be loaded. Please try again.');
      }
    }

    fetch_from_cache();

    let timer = setInterval(() => {
      fetch_from_cache();
    },5000);

    return () => clearInterval(timer);
  },[])

  const handleFileUpload = async(e,file_id) => {
    e.preventDefault();

    try{
      const res = await icd_server.post('/file_api/upload_file/',{file_id},{
        headers:{
            'Authorization':'Bearer '+localStorage.getItem('access_token')
        }
      });

      if(res.status==200)
        console.log();
    }catch{
      alert('The file could not be uploaded.Please try again.');
    }
  }

  return (
    <div className={styles.folderUploaderForm}>

      <div className={styles.upload}>
        <Stack sx={{ width: '50%' }} spacing={2}>
          {alert && <Alert severity="error" onClose={()=>setAlert(false)}>Please select a folder to upload.</Alert>}
        </Stack>

        <div className={styles.folderInput}>
          <label htmlFor="file">Select a folder to upload</label>
          <input id="file" webkitdirectory="true" multiple type="file" onChange={handleFolderSelect}/>
          <button className={styles.uploadButton} onClick={handleFolderUpload}>Upload</button>
        </div>

        {upload && !success && <span><FolderLoadAnimation/></span>}
      </div>

      {failedData?.length > 0 && 
      <div className={styles.data}> 
        <span className={styles.headSpan} style={{backgroundColor:'#a70303'}}>Failed Uploads</span>
        <table className={styles.datatable}>
          <tr className={styles.tableHeader}>
            <th>File ID</th>
            <th>File Name</th>
          </tr>
          {failedData?.map((file,index) => (
            <tr key={index}>
              <td style={{cursor:'pointer'}}>{file.file_id}</td>
              <td>{file.file_name}</td>
              <td onClick={(e)=>handleFileUpload(e,file.file_id)} style={{cursor:'pointer',color:'#ca1900'}}>Retry</td>
            </tr>
          ))}
        </table>
      </div>}

      {successData?.length > 0 && <>
      <div className={styles.successContainer}>
      {successData?.map((file,index) => (
        <div key={index} className={styles.successData}>
          <h4 style={{color:'#e74c3c '}}>{file.file_name}</h4>
          <p style={{cursor:'pointer',color:'#566573'}}>{file.file_id} <FontAwesomeIcon icon={faFilePdf}/> <FontAwesomeIcon icon={faArrowUpRightFromSquare} onClick={() => window.open(file.input_path)}/></p>
        </div>
      ))}
      </div></>}

    </div>
  )
}

export default FolderUploader