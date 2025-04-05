
import { useState } from 'react';

import { ModalMovie } from '../Modals';
import { genreMap } from '../../Constants';

export const Movie = ({ displayedMovies }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {displayedMovies.map((movie) => (
                    <div
                        key={movie.id}
                        className="bg-white text-[#333] p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                            onClick={() => openModal(movie)}
                            alt={movie.title}
                            className="w-full h-48 object-cover rounded mb-4"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/500x281?text=No+Image';
                            }}
                        />
                        <h2 className="text-lg font-semibold mb-2 text-[#e7000b]">
                            {movie.title}
                        </h2>
                        <p className="text-sm text-gray-600 mb-2">
                            {movie.overview
                                ? movie.overview.slice(0, 100) + "..."
                                : "Sin descripción disponible."}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                            <strong>Géneros:</strong>{" "}
                            {movie.genre_ids
                                .map((id) => genreMap[id])
                                .filter(Boolean)
                                .join(", ")}
                        </p>
                        <button 
                            className="bg-[#e7000b] text-white px-4 py-2 rounded hover:bg-[#c60009] transition duration-300"
                        >
                            Comprar Boleto
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && selectedMovie && (
                <ModalMovie
                    selectedMovie={selectedMovie}
                    genreMap={genreMap}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};