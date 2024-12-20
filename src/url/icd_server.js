import axios from "axios";

const icd_server = axios.create({
  baseURL: "http://3.16.26.59:8000",
});

export default icd_server;
