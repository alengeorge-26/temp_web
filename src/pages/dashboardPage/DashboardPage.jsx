import styles from "./dashboardpage.module.css"
import Navbar from "../../components/navbar/Navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBuilding, faCheck, faClock, faEye, faEyeSlash, faFile } from "@fortawesome/free-solid-svg-icons"
import { Chart as ChartJS, PointElement,LineElement, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import { Doughnut,Bar} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { UserContext } from "../../contextapi.js/user_context";
import { useContext } from "react";
import { useEffect,useState } from "react";
import icd_server from "../../url/icd_server";

ChartJS.register(
  ArcElement, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const DashboardPage = () => {
    const {client_id} = useContext(UserContext);

    const [total_projects,setTotalProjects] = useState(0);
    const [total_uploads,setTotalUploads] = useState(0);
    const [total_processed,setTotalProcessed] = useState(0);
    const [total_not_processed,setTotalNotProcessed] = useState(0);
    const [total_viewed,setTotalViewed] = useState(0);
    const [total_not_viewed,setTotalNotViewed] = useState(0);
    const [count_by_projects,setCountByProjects] = useState([]);

    useEffect(() => {
        const overview_data = async () => {
            try{
                const res = await icd_server.get('/file_api/overview_data/',{
                    params: {client_id:client_id},
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
                });

                if(res.status == 200){
                    setTotalNotProcessed(res.data.total_not_processed);
                    setTotalProcessed(res.data.total_processed);
                    setTotalUploads(res.data.total_uploads);
                    setTotalProjects(res.data.total_projects);
                    setTotalViewed(res.data.total_viewed);
                    setTotalNotViewed(res.data.total_not_viewed);
                    setCountByProjects(res.data.count_by_projects);
                }
            }catch{
                console.log('Error');
            }
        }

        overview_data();
    },[]);

    const data_1 = {
        labels: ['Processed','Not Processed'],
        datasets: [
        {
            data: [total_processed,total_not_processed],
            backgroundColor: [
                '#3498db',
                '#fffcb1'
            ],
            borderColor: [
                'black'
            ],
            borderWidth: 1,
        },],
    };

    const options_1 = {
        plugins: {
            legend: {
                labels: {
                    color: 'black',
                    font: {
                        family: 'Poppins',
                        size: 15,
                    },
                    boxWidth: 10,
                },
                position: 'top',
                align: 'center', 
            },
            datalabels: {
                display: function(context) {
                    return context.dataset.data[context.dataIndex] !== 0;
                },
                color: 'black',
                font: {
                    family: 'Poppins',
                    size: 12,
                    weight: 'bold',
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };
    
    const data_2 = {
        labels: ['Viewed','Not Viewed'],
        datasets: [
        {
            data: [total_viewed,total_not_viewed],
            backgroundColor: [
                '#3498db',
                '#f0b27a'
            ],
            borderColor: [
              'black'
            ],
            borderWidth: 1,
        },],
    };

    const options_2 = 
    {
        plugins: 
        {
            legend: 
            {
                labels: 
                {
                    color: 'black',
                    font:
                    {
                        family:'Poppins',
                        size:15
                    },
                    boxWidth: 10,
                }
            },
            datalabels: 
            {
                display: function(context) {
                    return context.dataset.data[context.dataIndex] !== 0;
                },
                color: 'black',
                font:
                {
                    family:'Poppins',
                    size:12,
                    weight:'bold'
                }
            }
        }
    };

    const bar_data_1 = {
        labels: count_by_projects.map(element => element.project_id__project_name),
        datasets: [{
          data: count_by_projects.map(element => element.count),
          backgroundColor: [
            '#9b59b6',
            '#2980b9',
            '#e67e22',
          ],
          borderColor: [
            '#9b59b6',
            '#2980b9',
            '#e67e22',
          ],
          borderWidth: 1,
          barThickness: 50, 
          maxBarThickness: 70, 
        }]
    };

    const bar_options_1 = {
        responsive: true,
        plugins: {
            legend: {
                display: false, 
            },
            tooltip: {
                enabled: true, 
                callbacks: {
                    label: (tooltipItem) => {
                        return `Sales: ${tooltipItem.raw}`; 
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true, 
                    text: "Projects",
                    font: {
                        size: 14, 
                    },
                    color: "black",
                },
                grid: {
                    display: false,
                },
            },
            y: {
                title: {
                    display: true, 
                    text: "Files",
                    font: {
                        size: 14,
                    },
                    color: "black",
                },
                grid: {
                    display: true, 
                    color: "rgba(200, 200, 200, 0.3)",
                },
                beginAtZero: true, 
                ticks: {
                    stepSize: 2,
                },
                max: 10,
            },
        },
    };
    
    return (
        <div className={styles.parentDashboardContainer}>
            <Navbar/>
            <div className={styles.dashboardContainer}>
                <section className={styles.dashboardSection}>
                    <ul className={styles.dashboardList}>
                        <li style={{listStyleType: "none"}}>Overview of : {client_id}</li>
                    </ul>

                    <div className={styles.dashboardData}>
                        <div className={styles.dashboardDataCards} style={{backgroundColor: "#f0b27a",color:'#1b2631'}}>
                            <div className={styles.dashboardDataCardsInfo}>
                                <FontAwesomeIcon icon={faBuilding} size="lg" style={{borderRadius: "50%",backgroundColor:'white',padding:'10px',border:'2px solid black'}}/>
                                <div className={styles.dashboardDataCardsInfoText}>
                                    <span style={{fontSize: "30px"}}>{total_projects}</span>
                                    <span>Total Projects</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.dashboardDataCards} style={{backgroundColor: "#58d68d",color:'#1b2631'}}>
                            <div className={styles.dashboardDataCardsInfo}>
                                <FontAwesomeIcon icon={faFile} size="lg" style={{borderRadius: "50%",backgroundColor:'white',padding:'10px',border:'2px solid black'}}/>
                                <div className={styles.dashboardDataCardsInfoText}>
                                    <span style={{fontSize: "30px"}}>{total_uploads}</span>
                                    <span>Total Files</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.dashboardDataCards} style={{backgroundColor: "#3498db",color:'#1b2631'}}>
                            <div className={styles.dashboardDataCardsInfo}>
                                <FontAwesomeIcon icon={faCheck} size="lg" style={{borderRadius: "50%",backgroundColor:'white',padding:'10px',border:'2px solid black'}}/>
                                <div className={styles.dashboardDataCardsInfoText}>
                                    <span style={{fontSize: "30px"}}>{total_processed}</span>
                                    <span>Processed Files</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.dashboardDataCards} style={{backgroundColor:'#58d68d',color:'#1b2631'}}>
                            <div className={styles.dashboardDataCardsInfo}>
                                <FontAwesomeIcon icon={faClock} size="lg" style={{borderRadius: "50%",backgroundColor:'white',padding:'10px',border:'2px solid black'}}/>
                                <div className={styles.dashboardDataCardsInfoText}>
                                    <span style={{fontSize: "30px"}}>{total_not_processed}</span>
                                    <span>To Be Processed</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.dashboardDataCards} style={{backgroundColor: "#3498db",color:'#1b2631'}}>
                            <div className={styles.dashboardDataCardsInfo}>
                                <FontAwesomeIcon icon={faEye} size="lg" style={{borderRadius: "50%",backgroundColor:'white',padding:'10px',border:'2px solid black'}}/>
                                <div className={styles.dashboardDataCardsInfoText}>
                                    <span style={{fontSize: "30px"}}>{total_viewed}</span>
                                    <span>Reviewed Files</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.dashboardDataCards} style={{backgroundColor: "#f0b27a",color:'#1b2631'}}>
                            <div className={styles.dashboardDataCardsInfo}>
                                <FontAwesomeIcon icon={faEyeSlash} size="lg" style={{borderRadius: "50%",backgroundColor:'white',padding:'10px',border:'2px solid black'}}/>
                                <div className={styles.dashboardDataCardsInfoText}>
                                    <span style={{fontSize: "30px"}}>{total_not_viewed}</span>
                                    <span>To Be Reviewed</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.dashboardDataCards} style={{backgroundColor:'#58d68d',color:'#1b2631'}}>
                            <div className={styles.dashboardDataCardsInfo}>
                                <FontAwesomeIcon icon={faClock} size="lg" style={{borderRadius: "50%",backgroundColor:'white',padding:'10px',border:'2px solid black'}}/>
                                <div className={styles.dashboardDataCardsInfoText}>
                                    <span style={{fontSize: "30px"}}>{total_not_processed}</span>
                                    <span>To Be Processed</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.dashboardDataCards} style={{backgroundColor: "#3498db",color:'#1b2631'}}>
                            <div className={styles.dashboardDataCardsInfo}>
                                <FontAwesomeIcon icon={faCheck} size="lg" style={{borderRadius: "50%",backgroundColor:'white',padding:'10px',border:'2px solid black'}}/>
                                <div className={styles.dashboardDataCardsInfoText}>
                                    <span style={{fontSize: "30px"}}>{total_processed}</span>
                                    <span>Processed Files</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.dashboardPie}>
                        <div className={styles.dashboardPieChart}>  
                            <Doughnut data={data_1} options={options_1} plugins={[ChartDataLabels]}/>
                        </div>
                        
                        <div className={styles.dashboardPieChart}>  
                            <Doughnut data={data_2} options={options_2} plugins={[ChartDataLabels]}/>
                        </div>

                        <div className={styles.dashboardPieChart}>  
                            <Doughnut data={data_2} options={options_2} plugins={[ChartDataLabels]}/>
                        </div>
                    </div>

                    <div className={styles.dashboardBar}>
                        <Bar data={bar_data_1} options={bar_options_1}/>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DashboardPage