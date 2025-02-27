import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import { getPopularMoviesFromTMDB } from "../helpers";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../../index.css";

export const PopularMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const moviesData = await getPopularMoviesFromTMDB();
      setMovies(moviesData);
    } catch (error) {
      console.error("Error al obtener las películas:", error);
    }
  };

  return (
    <section className="py-16 px-4" id="cartera">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          Películas en Cartelera
        </h2>
        <p className="text-black text-center mb-12 max-w-2xl mx-auto">
          Descubre los últimos estrenos y disfruta de la mejor experiencia
          cinematográfica
        </p>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          initialSlide={2}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1.5,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="mySwiper"
        >
          {console.log(movies.error)}
          {!!movies.error && (
            <p className="text-center text-red-500 font-bold text-2xl">
              Error al obtener peliculas:{" "}
              <span>{movies.error.message.toUpperCase()}</span>
            </p>
          )}
          {!movies.error &&
            movies.map((movie) => (
              <SwiperSlide
                key={movie.id}
                className="max-w-xs rounded-lg overflow-hidden"
              >
                <div className="relative group">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-lg">
                    <h3 className="text-white font-bold text-xl mb-1">
                      {movie.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-2 justify-around">
                      {" "}
                      {movie.overview}{" "}
                    </p>
                    <p className="text-gray-300 text-sm mb-2">
                      {movie.release_date}
                    </p>
                    <div className="flex items-center mb-3">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="text-white">{movie.vote_average}</span>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300 text-sm font-medium">
                      Ver detalles
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};
