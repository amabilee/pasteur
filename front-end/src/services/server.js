import axios from "axios";

export const server = axios.create({
    baseURL: 'http://10.160.95.171:3000'
})