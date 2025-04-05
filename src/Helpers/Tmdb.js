

import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY_TMDB;


export const getMoviesUpcoming = async (page = 1) => {
    try {
        
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es-ES&page=${page}`;
        const response = await axios.get(url);
        return response.data.results

    } catch (error) {
        return {
            msg: "Hubo un error, intenta nuevamente",
            error
        }
    }
}





export const getActorsFromMovie = async (id) => {
    try {
        
        const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=es-ES`;
        const response = await axios.get(url);
        return response.data.cast

    } catch (error) {
        return {
            msg: "Hubo un error, intenta nuevamente",
            error
        }
    }
 
}

