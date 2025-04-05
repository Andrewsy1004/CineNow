

import { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import { getPopularMoviesFromTMDB } from '../../Landing/helpers';
import { Loader } from '../../Components/';
import { genreMap }  from "../../Constants"; 

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const SlideMovies = () => {
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

  const baseImageUrl = "https://image.tmdb.org/t/p/";
  const backdropSize = "original";
  const posterSize = "w500";

  if (loading) return <Loader />;

  return (
    <div className="relative w-full">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="w-full h-full rounded-lg overflow-hidden"
      >
        {movies.map((movie) => (
          <SwiperSlide key={`${movie.id}`} className="relative">
            <div className="relative w-full h-96 md:h-screen md:max-h-[70vh]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${baseImageUrl}${backdropSize}${movie.backdrop_path})`,
                  backgroundPosition: 'center',
                }}
              ></div>

              {/* Capa de degradado para mejor legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

              {/* Contenido */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center md:items-start gap-8">

                  <div className="hidden md:block w-40 md:w-64 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105">
                    <img
                      src={`${baseImageUrl}${posterSize}${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto"
                    />
                  </div>

                  {/* Información */}
                  <div className="flex flex-col text-white max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-2">
                      {movie.title}
                    </h2>

                    <div className="flex items-center gap-4 mb-3">
                      <div className="bg-yellow-400 text-black font-semibold px-2 py-1 rounded text-sm">
                        {movie.vote_average.toFixed(1)}/10
                      </div>

                      <div className="text-sm flex items-center">
                        <span className="w-4 h-4 flex items-center justify-center mr-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                          </svg>
                        </span>
                        {movie.release_date}
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 line-clamp-3 md:line-clamp-4">
                      {movie.overview || "Sin descripción disponible."}
                    </p>

                    <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-6 justify-center md:justify-start">
                      {movie.genre_ids?.slice(0, 3).map((genreId) => (
                        <span
                          key={genreId}  
                          className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs px-3 py-1 rounded-full transition-colors duration-200"
                        >
                          {genreMap[genreId] || "Otros"}
                        </span>
                      ))}
                    </div>

                    <div>
                      <button
                        className="bg-primary-red hover:bg-red-800 text-white 
                         font-medium py-2 px-6 md:py-3 md:px-8 
                         rounded-full text-sm md:text-base
                         transition-colors duration-200 w-full sm:w-auto"
                      >
                        Comprar Boleto
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};