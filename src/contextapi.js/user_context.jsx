import { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from './user_context';
import icd_server from '../url/icd_server';
import { jwtDecode } from "jwt-decode";

export const UserContextProvider = (props) => {
    const token_time = 1000*60*30;

    const [token, setToken] = useState(()=>localStorage.getItem("access_token"));
    const [refresh, setRefresh] = useState(()=>localStorage.getItem("refresh_token"));
    const [user_id, setUserId] = useState(()=>localStorage.getItem("user_id"));
    const [user_role, setUserRole] = useState(()=>localStorage.getItem("user_role"));
    const [client_id, setClientId] = useState(()=>localStorage.getItem("client_id"));
    const [auth, setAuth] = useState(()=>localStorage.getItem("auth"));

    const [fileID, setFileID] = useState(()=>localStorage.getItem("file_id"));
    const [fileName, setFileName] = useState(()=>localStorage.getItem("file_name"));
    const [fileURL, setFileURL] = useState(()=>localStorage.getItem("file_url"));

    const log_out = () => {
        icd_server.get("/user_api/logout/",{
          headers:{'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
        });

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setToken(null);
        setRefresh(null);

        setUserId(null);
        localStorage.removeItem("user_id");
        setUserRole(null);
        localStorage.removeItem("user_role");
        setClientId(null);
        localStorage.removeItem("client_id");
        setAuth(false);
        localStorage.removeItem("auth");

        setFileID(null);
        localStorage.removeItem("file_id");
        setFileName(null);
        localStorage.removeItem("file_name");
        setFileURL(null);
        localStorage.removeItem("file_url");
    }

    const updateToken = async () => {
        console.log("Updating Token "+Date.now());
        try{
          const response = await icd_server.post("/user_api/api/token/refresh/", {
            refresh: refresh,
          })
    
          if(response.status === 200){
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            setToken(response.data.access);
            setRefresh(response.data.refresh);
          }
          else
            log_out();
        }catch{
          log_out();
        }
      }

    const contextValues = {
        user_id, setUserId, 
        token, setToken,
        refresh, setRefresh,
        user_role, setUserRole,
        client_id, setClientId,
        auth, setAuth,
        fileID, setFileID,
        fileName, setFileName,
        fileURL, setFileURL,
        log_out,
        updateToken
    };
    
    useEffect(() => {
        let interval = setInterval(() => {
            if(token !== null && refresh !== null)
                updateToken();
        },token_time);

        if(token!==null && jwtDecode(token).exp*1000 < Date.now())  
          log_out();
        
        return () => clearInterval(interval);
    },[token,refresh]);

    return(
        <UserContext.Provider value={contextValues}>
        {props.children}
        </UserContext.Provider>
    );
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};