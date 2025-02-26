

import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY_TMDB;

export const getPopularMoviesFromTMDB = async (page = 1) => {
    try{
      
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=${page}`;      
      const response = await axios.get(url);       
      return response.data.results
    
    }catch(error){
      return{
        msg: "Hubo un error, intenta nuevamente",
        error
      }
    
    }
}