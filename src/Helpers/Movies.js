
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;


export const getMoviesWithPagination = async ( page, token ) => {

    try {
        const response = await axios.get(`${baseUrl}/movies/getMovies?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
                
        return response.data.movies;
   
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
}
