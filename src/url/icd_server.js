import axios from "axios";

const icd_server = axios.create({
  baseURL: "http://18.119.115.248:8000",
});

export default icd_server;
