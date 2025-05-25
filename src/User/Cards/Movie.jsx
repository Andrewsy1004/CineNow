import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ModalFormUser, ModalMovie } from "../Modals";
import { genreMap } from "../../Constants";

import toast from "react-hot-toast";

import useAuthStore from "../../Store/authStore";
import { BookMovie } from "../../Cashier";
import { Cinemaseats } from "../Components";
import { Tickets } from "../../User/Components";


export const Movie = ({ displayedMovies, Upcoming = false }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalInfoUser, setModalInfoUser] = useState(false);
  const [infoBoleto, setInfoBoleto] = useState(false);
  const [modalPelicula, setModalPelicula] = useState(false);
  const [modalAsientos, setModalAsientos] = useState(false);
  const [showTickets, setShowTickets] = useState(false);

  const [infoUser, setInfoUser] = useState(null);
  const [AsientosOcupado, setAsientosOcupado] = useState([]);
  const [infoHorario, setInfoHorario] = useState(null);

  const navigate = useNavigate();

  const roles = useAuthStore((state) => state.roles);

  const cerrarModalAsientos = () => {
    setModalAsientos(false);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleModalInfoUser = (movie) => {
    setModalInfoUser(true);
    setSelectedMovie(movie);
  };

  const handleCloeModalUser = () => {
    setModalInfoUser(false);
  };

  const handleModalPelicula = (movie) => {
    setModalPelicula(true);
    setSelectedMovie(movie);
  };

  const closeModalPelicula = () => {
    setModalPelicula(false);
  };

  const finalizarCompra = async () => {
    toast.success("Compra realizada con éxito");
    setModalAsientos(false);
    setModalPelicula(false);

    if (roles.includes("Cajero")) {
      setShowTickets(true);
    }

  }



  const hacerFormatoPelicula = (pelicula) => {
    return {
      id: pelicula.id,
      title: pelicula.titulo,
      poster_path: pelicula.Poster,
      backdrop_path: pelicula.Poster,
      overview: pelicula.descripcion,
      vote_count: pelicula.promedio,
      genres: pelicula.generos,
      amount_of_tickets: parseInt(infoHorario.nentradas),
      horario: infoHorario.horario,
      fecha: infoHorario.fecha
    };


  };

  // hacerFormatoPelicula(selectedMovie);

  const handleMovieClick = (movie) => {

    const objectmovie = {
      id: movie.id,
      title: movie.title ?? movie.titulo,
      poster_path: movie.poster_path ?? movie.Poster,
      backdrop_path: movie.backdrop_path ?? movie.Poster,
      overview: movie.overview ?? movie.descripcion,
      vote_count: movie.vote_count ?? movie.promedio,
      genres: movie.genres ?? movie.generos,
      amount_of_tickets: 1,
    };

    const stored = JSON.parse(localStorage.getItem("entradas")) || [];

    const exists = stored.some((t) => t.id === objectmovie.id);

    // console.log("Entradas en localStorage:", stored);

    if (exists) {
      toast.error("Ya tienes un boleto para esta película.");
    } else {
      stored.push(objectmovie);
      localStorage.setItem("entradas", JSON.stringify(stored));
      toast.success("Boleto agregado correctamente.");
    }

  }


 useEffect(() => {
    if (showTickets && roles.includes('Cajero') && infoUser) {
      navigate('/tickets', { state: { cajero: true, tokenUser: infoUser.token } });
    }
  }, [navigate, showTickets, roles, infoUser]);

  // console.log(infoUser.token)

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayedMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white text-[#333] p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path ?? movie.Poster}`}
              onClick={() => openModal(movie)}
              alt={movie.title ?? movie.titulo}
              className="w-full h-48 object-cover rounded mb-4"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/500x281?text=No+Image";
              }}
            />
            <h2 className="text-lg font-semibold mb-2 text-[#e7000b]">
              {movie.title ?? movie.titulo}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              {movie.overview
                ? movie.overview.slice(0, 100) + "..."
                : movie.descripcion
                  ? movie.descripcion.slice(0, 100) + "..."
                  : "Sin descripción disponible."}
            </p>

            <div>
              <p className="text-sm text-gray-500 mb-4">
                <strong>Géneros:</strong>{" "}
                {movie.genre_ids?.length > 0
                  ? movie.genre_ids
                    .map((id) => genreMap[id])
                    .filter(Boolean)
                    .join(", ") || "Sin géneros disponibles"
                  : movie.generos?.length > 0
                    ? movie.generos.slice(0, 3).join(", ")
                    : "Sin géneros disponibles"}
              </p>
            </div>


            {
              (roles.includes("usuario") || roles.includes("VipUsuario")) && !Upcoming ? (
                <button
                  onClick={() => {
                    handleMovieClick(movie);
                  }}
                  className="bg-[#e7000b] text-white px-4 py-2 rounded hover:bg-[#c60009] transition duration-300"
                >
                  Agregar a mis entradas
                </button>
              ) : null
            }

            {
              (roles.includes("Cajero")) && !Upcoming ? (
                <button
                  onClick={() => {
                    handleModalInfoUser(movie);
                  }}
                  className="bg-[#e7000b] text-white px-4 py-2 rounded hover:bg-[#c60009] transition duration-300"
                >
                  Comprar Boletos
                </button>
              ) : null
            }




            {/* <button
              className="bg-[#e7000b] text-white px-4 py-2 rounded hover:bg-[#c60009] transition duration-300"
            >
              Comprar Boleto
            </button> */}

          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedMovie && (
        <ModalMovie
          selectedMovie={selectedMovie}
          genreMap={genreMap}
          closeModal={closeModal}
          Upcoming={Upcoming}
        />
      )}

      {modalInfoUser && selectedMovie && (
        <>
          <ModalFormUser selectedMovie={selectedMovie} onClose={handleCloeModalUser} setModalPelicula={setModalPelicula} setInfoUser={setInfoUser} />
        </>
      )}

      {modalPelicula && selectedMovie && (
        <>
          <BookMovie
            selectedMovie={selectedMovie}
            onClose={closeModalPelicula}
            infoUser={infoUser}
            setAsientosOcupado={setAsientosOcupado}
            setModalAsientos={setModalAsientos}
            setInfoHorario={setInfoHorario} />
        </>
      )}

      {modalAsientos && selectedMovie && (
        <>
          <Cinemaseats
            entradaSeleccionada={hacerFormatoPelicula(selectedMovie)}
            cerrarModal={cerrarModalAsientos}
            comprarEntradas={finalizarCompra}
            asientos={AsientosOcupado}
            cajero={true}
            infoUser={infoUser}
          />
        </>
      )}


    </div>
  );
};
