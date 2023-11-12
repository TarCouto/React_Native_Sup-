import axios from "axios";

import { AppError } from "@utils/AppError";


//Endreco de IP da Maquina
const api = axios.create({
    baseURL: 'https://sup-rm88383.azurewebsites.net/'
});

api.interceptors.response.use(
    response => response, 
    error => {
      let errorMessage = "Ocorreu um erro inesperado";
      if (error.response) {
        if (error.response.status === 403) {
          errorMessage = "Acesso negado: você não tem permissão para realizar esta ação.";
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      return Promise.reject(new AppError(errorMessage));
    }
  );

export { api };