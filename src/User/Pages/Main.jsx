import { Movies, SlideMovies } from "../Components";
import { useState, useEffect } from "react";
import { getPopularMoviesFromTMDB } from "../../Landing/helpers";

export const Main = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      setLoading(true);
      const moviesData = await getPopularMoviesFromTMDB(2);
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
