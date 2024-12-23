import axios from "axios";

const icd_server = axios.create({
  baseURL: "http://3.129.244.205:8000",
});

export default icd_server;