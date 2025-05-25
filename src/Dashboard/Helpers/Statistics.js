
import axios from 'axios';

import { monthMap } from '../../Constants/Generos';

const host = import.meta.env.VITE_API_BASE_URL;

export const GetGeneralStatistics = async (token) => {
  try {

    const response = await axios.get(`${host}/movies/GetGeneralStadistic`, {
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


export const GetSellByMonth = async (token) => {
  try {
    const response = await axios.get(`${host}/movies/SellByMonth`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });


    const labels = response.data.data.map(item => {
      const monthName = item.month.trim().split(' ')[1];
      return monthMap[monthName] || monthName;
    });

    const data = response.data.data.map(item => item.totalSales);

    return {
      labels,
      data
    }

  } catch (error) {
    console.error('Error fetching sales by month:', error);
    return {
      msg: 'Hubo un error, intenta nuevamente',
      error
    };
  }
};


export const GetMostPopularMovies = async (token) => {
  try {
    const response = await axios.get(`${host}/movies/GetMostPopularMovies`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });


    const labels = response.data.data.map(item => item.title);
    const data = response.data.data.map(item => item.totalTickets);
    
    return {
      labels,
      data
    }    

  } catch (error) {
    console.error('Error fetching sales by month:', error);
    return {
      msg: 'Hubo un error, intenta nuevamente',
      error
    };
  }
};


export const IncomesByAuditorium = async (token) => {
  try {
    const response = await axios.get(`${host}/movies/IncomesByAuditorium`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const labels = response.data.data.map(item => item.name);
    const data = response.data.data.map(item => item.totalRevenue);
    
    return {
      labels,
      data
    }    

  } catch (error) {
    console.error('Error fetching sales by month:', error);
    return {
      msg: 'Hubo un error, intenta nuevamente',
      error
    };
  }
};