import icd_server from "../../url/icd_server";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./loginbox.module.css";
import { UserContext } from "../../contextapi.js/user_context";
import { useContext } from "react";
import { jwtDecode } from "jwt-decode";

const LoginBox = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { setUserId,setToken,setRefresh,setUserRole,setClientId,setAuth } = useContext(UserContext);

  const navigate = useNavigate();

  const loginFunc = async (e) => {
    e.preventDefault();

    try {
      const response = await icd_server.post("/user_api/login/", {
        username,
        password,
      });

      if (response.status === 200) {
        const access_token = response.data.access;
        const refresh_token = response.data.refresh;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        const decoded = jwtDecode(access_token);

        setToken(access_token);
        setRefresh(refresh_token);

        setUserId(decoded.user_id_id);
        localStorage.setItem("user_id", decoded.user_id_id);
        setUserRole(decoded.role_id);
        localStorage.setItem("user_role", decoded.role_id);
        setClientId(decoded.client_id);
        localStorage.setItem("client_id", decoded.client_id);
        setAuth(true);
        localStorage.setItem("auth", true);
        navigate("/")
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={loginFunc} className={styles.loginForm}>
        <div className={styles.inputContainer}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "#C70039 ",background: "#eaeefa ",padding: "5px",borderRadius: "5px", fontSize:"12px" }}>{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginBox;