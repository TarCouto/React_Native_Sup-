import axios from "axios";

import { AppError } from "@utils/AppError";


//Endreco de IP da Maquina
const api = axios.create({
    baseURL: 'exp://192.168.1.232:8081'
});

api.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message))
    } else {
        return Promise.reject(error)
    }

})

export { api };