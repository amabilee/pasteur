import axios from "axios";

export const server = axios.create({
    baseURL: 'http://192.168.0.101:3000'
})