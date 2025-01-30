import axios from "axios";

const icd_server = axios.create({
  baseURL: import.meta.env.VITE_ICD_SERVER_BASE_URL,
});

export default icd_server;