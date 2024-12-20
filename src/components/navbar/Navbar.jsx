import styles from './navbar.module.css'
import { UserContext } from "../../contextapi.js/user_context";
import { useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faUser,faBars,faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const { auth,user_role,log_out,user_id} = useContext(UserContext);

    const handle_logout = () => { 
        log_out();
        navigate("/");
        window.location.reload();
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.litems}>
                <button onClick={() => navigate('/')} className={styles.navbut}><FontAwesomeIcon icon={faHouse} size="lg"/></button>
            </div>

            <div className={`${open ? styles.ritems_active : styles.ritems}`}>
                {auth && <>
                        {(user_role==='ADM' || user_role==='UPL') && 
                            (<button onClick={() => navigate('/folderuploader')} className={styles.navbut}>Upload Folder</button>)}

                        {(user_role==='ADM' || user_role==='VWR') &&
                            (<button onClick={() => navigate('/viewfiles')} className={styles.navbut}>View Files</button>)}
                </>}

                {!auth ? (<button onClick={() => navigate('/login')} style={{color:'var(--main_back_blue)',padding:'5px',backgroundColor:'white',borderRadius:'2px',border:'none',outline:'none',cursor: 'pointer'}}>Login</button>) :

                (<>
                    <button style={{padding:'5px',borderRadius:'2px',border:'none',outline:'none',cursor: 'pointer'}} onClick={() => navigate('/dashboard')}><FontAwesomeIcon icon={faUser}/> {user_id}</button>
                    <button style={{backgroundColor:'#d90000 ',padding:'5px',color:'white',borderRadius:'2px',border:'none',outline:'none',cursor: 'pointer'}} onClick={handle_logout}>Logout</button>
                </>)}
            </div>

            <div className={styles.check} onClick={() => setOpen(!open)}> 
                {open ? <FontAwesomeIcon icon={faCircleXmark} /> : <FontAwesomeIcon icon={faBars}/>}
            </div>
        </div>
    )
}

export default Navbar