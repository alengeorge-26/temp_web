import { useState } from 'react'
import styles from './fileuploader.module.css'
import icd_server from '../../url/icd_server';
const FileUploader = () => {
  const [filename, setFilename] = useState('Please select a file');
  const [file,setFile]=useState();
  const [url,setUrl]=useState('');
 
  const handleFileChange = (e) => {
    e.preventDefault();

    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  }

  const uploadFile = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file',file);

    try{
      const res = await icd_server.post('/file_api/upload_file/',formData,{
        headers:{
            'Content-Type':'multipart/form-data',
            'Authorization':'Bearer '+localStorage.getItem('access_token')
        }
      });

      if(res.status==200)
        setUrl(res.data.file_url)
      else
        setUrl(res.data.message)
    }catch{
      alert('The file could not be uploaded.Please try again.');
    }
  }

  return (
    <div className={styles.fileUploaderForm}>

      <div className={styles.fileInput}>
        <label htmlFor="file">Select a file : </label>
        <input id="file" type="file" onChange={handleFileChange} placeholder={filename}/>
      </div>

      <button onClick={uploadFile}>Upload</button>

      {url && <button onClick={()=>window.open(url)}>Open URL</button>}
    </div>
  )
}

export default FileUploader