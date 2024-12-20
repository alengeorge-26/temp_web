import icd_server from "../../url/icd_server"
import { useState,useEffect} from "react"
import styles from "./viewfile.module.css"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contextapi.js/user_context";
import { useContext } from "react";

const ViewFile = () => {
    const [files,setFiles] = useState([]);
    const [client_id, setClientId] = useState('');
    const [alert, setAlert] = useState(false);

    const navigate = useNavigate();

    const {setFileURL,setFileID,setFileName} = useContext(UserContext);

    useEffect(() => {
        const getFiles = async () => {
            setAlert(false);

            try{
                const res = await icd_server.get('/file_api/get_files/',
                {
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
                });

                if(res.status == 200){
                    setFiles(res.data.file_data)
                    setClientId(res.data.client_id)
                };
            }catch{
                setAlert(true);
            }
        }

        getFiles();

        let timer = setInterval(() => {
            getFiles();
        },5000);

        return () => clearInterval(timer);
    },[])

    return (
        <div className={styles.viewFileContainer}>
            {alert && <Stack sx={{ width: '50%' }} spacing={2}>
                <Alert severity="error" onClose={() => setAlert(false)}>The files could not be loaded.</Alert>
            </Stack>}

            <span className={styles.headSpan}>Viewing files of - {client_id}</span>
            <div className={styles.fileList}>
                {files?.map((file) => (
                    <div key={file.file_id} className={styles.fileContainer}>
                        <h2>{file.file_name}</h2>
                        <p>{file.file_id}</p>
                        <div className={styles.fileDetails}>
                            <p>Uploaded At : {file.uploaded_at.split("T")[0]}</p>
                            <p>Updated At : {file.updated_at.split("T")[0]}</p>
                            <p>Project ID : {file.project_id}</p>
                        </div>

                        <div className={styles.fileStatus}>
                            <button>{file.status} </button>
                            <button>{file.viewed ? "Viewed" : "Not Viewed"}</button>
                            

                            <span onClick={() =>{
                                setFileID(file.file_id);
                                localStorage.setItem('file_id',file.file_id);
                                setFileURL(file.input_path);
                                localStorage.setItem('file_url',file.input_path);
                                setFileName(file.file_name);
                                localStorage.setItem('file_name',file.file_name);
                                {navigate('/highlightpdf')}}} style={{cursor:"pointer"}}>
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ViewFile