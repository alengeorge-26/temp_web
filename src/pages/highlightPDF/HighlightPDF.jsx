import { useEffect,useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { pdfjs, Document, Page } from 'react-pdf';
import { UserContext } from '../../contextapi.js/user_context';
import { useContext } from 'react';
import styles from './highlightpdf.module.css'
import Navbar from '../../components/navbar/Navbar';
import TransitionsPopper from '../../components/utils/transitionsPopper/TransitionsPopper';
import icd_server from '../../url/icd_server';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const HighlightPDF = () => {
  const {fileID,fileURL,fileName} = useContext(UserContext)

  const [numPages, setNumPages] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const [text, setText] = useState('');
  const [desc, setDesc] = useState('');
  const [code, setCode] = useState('');
  const [hcc_code, setHccCode] = useState('');
  const [temp, setTemp] = useState([]);
  const [alert, setAlert] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => { 
    const loadData = async () => {
      try{  
        const response = await icd_server.post('/file_api/conditions_data/',
          {
            file_id:fileID,
            file_name:fileName
          },
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
          }
        );
        setTemp(response.data);
        console.log(response.data);
      }catch{
        setAlert(true);
      }
    }

    loadData(); 
  },[]);


  const highlightText = () => {
    const newHighlights = [];

    temp.map((item) => {
      if(item.HCC_Code!==null)
        newHighlights.push({
        pageIndex: 0,
        top: item.BoundingBox.Top * 100,
        left: item.BoundingBox.Left * 100,
        width: item.BoundingBox.Width * 100,
        height: item.BoundingBox.Height * 100,
        text: item.Text,
        desc: item.Description,
        code: item.Code,
        hcc_code: item.HCC_Code
      });
    })

    setHighlights(newHighlights);
  };

  useEffect(() => {
    highlightText();
  },[temp]);

  return (
    <>
      <Navbar/>
  
      <div className={styles.pdfContainer}>
        {alert && <Stack sx={{ width: '50%',display: 'flex',alignItems: 'center'}} spacing={2}>
          {alert && <Alert severity="warning" onClose={()=>setAlert(false)}>File not processed !</Alert>}
        </Stack>}

        <Document file={fileURL} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index}`} className={styles.pdfPage}>
              
              <Page pageNumber={index + 1}/> 

              {highlights?.filter((hl) => hl.pageIndex === index).map((hl, idx) => (
                  <div
                    key={`highlight_${idx}`}
                    className={styles.highlight}
                    style={{
                      '--top': `${hl.top}%`,
                      '--left': `${hl.left}%`,
                      '--width': `${hl.width}%`,
                      '--height': `${hl.height}%`,
                    }}
                    onMouseEnter={()=>{setText(hl.text);setDesc(hl.desc);setCode(hl.code);setHccCode(hl.hcc_code)}}
                    onMouseLeave={()=>{setText(null);setDesc(null)}}
                  >
                    {text!==null && desc!==null && <TransitionsPopper text={text} desc={desc} code={code} hcc_code={hcc_code}/>}
                  </div>
                ))}
            </div>
          ))}
        </Document>
      </div>
    </>
  );
}

export default HighlightPDF;