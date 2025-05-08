import { Movies, SlideMovies } from "../Components";
import { useState, useEffect } from "react";
import { getPopularMoviesFromTMDB } from "../../Landing/helpers";
import { getMoviesWithPagination } from "../../Helpers";

import useAuthStore from '../../Store/authStore';


export const Main = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    getMovies();
  }, []);
  

  const getMovies = async () => {
    try {
      setLoading(true);
      // const moviesData = await getPopularMoviesFromTMDB(1);
      
      const moviesData = await getMoviesWithPagination(1, token);

      setMovies(moviesData);
    } catch (error) {
      console.error("Error al obtener las películas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SlideMovies movies={movies} loading={loading} />

      <Movies />
    </>
  );
};
