

import axios from 'axios';

const host = import.meta.env.VITE_API_BASE_URL;

export const GetLogsUsers  = async ( token ) => {
    try{
        
      const response = await axios.get(`${host}/auth/GetLogsUser`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data


    } catch (error) {
      return {
        msg: "Hubo un error, intenta nuevamente",
        error
      };   
    }
}


export const GetUsers  = async ( token ) => {
    try{
        
      const response = await axios.get(`${host}/auth/GetAllUsers`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data


    } catch (error) {
      return {
        msg: "Hubo un error, intenta nuevamente",
        error
      };   
    }
}