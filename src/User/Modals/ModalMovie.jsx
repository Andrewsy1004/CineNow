import { X } from "lucide-react";

import { useState, useEffect } from "react";
import { getActorsFromMovie } from "../../Helpers";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';

import "swiper/css";

export const ModalMovie = ({ selectedMovie, genreMap, closeModal, Upcoming = false }) => {
  const [actores, setActores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMoviesActors();
  }, []);

  const getMoviesActors = async () => {
    try {
      setLoading(true);
      const actoresData = await getActorsFromMovie(selectedMovie.id);
      setActores(actoresData);
    } catch (error) {
      console.error("Error al obtener las películas:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-primary-red">
            {selectedMovie.title ?? selectedMovie.titulo}
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-primary-red"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <img
          src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path ?? selectedMovie.Poster}`}
          alt={selectedMovie.title}
          className="w-full h-30 object-cover rounded mb-4"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/500x281?text=No+Image";
          }}
        />

        <p className="text-sm text-gray-600 mb-2">
          {selectedMovie.overview ?? selectedMovie.descripcion }
        </p>

        <div>
          <p className="text-sm text-gray-500 mb-2">
            <strong>Géneros:</strong>{" "}
            {selectedMovie.genre_ids?.length > 0
              ? selectedMovie.genre_ids
                .map((id) => genreMap[id])
                .filter(Boolean)
                .join(", ") || "Sin géneros disponibles"
              : selectedMovie.generos?.length > 0
                ? selectedMovie.generos.slice(0, 3).join(", ")
                : "Sin géneros disponibles"}
          </p>
        </div>

        <div className="mb-3">
          <h3 className="text-lg font-semibold mb-3 text-primary-red">Reparto</h3>

          {loading ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-primary-red border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : actores.length > 0 ? (
            <Swiper
              spaceBetween={10}
              slidesPerView={3}
              modules={[Autoplay]}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
                0: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
              }}
              className="actores-swiper"
            >
              {actores.map((actor) => (
                <SwiperSlide key={actor.id}>
                  <div className="p-3 rounded-lg h-full w-50 ">
                    <img
                      src={actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : 'https://via.placeholder.com/200x300?text=No+Image'}
                      alt={actor.name}
                      className="w-15 h-15 object-cover rounded-md mb-2 mx-auto"
                    />
                    <p className="font-medium text-center text-xs">{actor.name}</p>
                    <p className="text-xs text-gray-500 text-center">{actor.character || "Personaje desconocido"}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-sm text-gray-500">No hay información disponible sobre el reparto.</p>
          )}
        </div>

        {/* {
          !Upcoming && (
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
              >
                Cancelar
              </button>

              <button
                className="bg-[#e7000b] text-white px-4 py-2 rounded hover:bg-[#c60009] transition duration-300"
              >
                Comprar Boleto
              </button>
            </div>
          )
        } */}

      </div>
    </div>
  );
};
