
import { X } from "lucide-react";

import { useState, useEffect } from "react";
import { getActorsFromMovie } from "../../Helpers";


export const ModalMovie = ({ selectedMovie, genreMap, closeModal }) => {
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

    // console.log(actores);



    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-primary-red">{selectedMovie.title}</h2>
                    <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-primary-red"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <img
                    src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`}
                    alt={selectedMovie.title}
                    className="w-full h-48 object-cover rounded mb-4"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/500x281?text=No+Image';
                    }}
                />

                <p className="text-sm text-gray-600 mb-4">
                    {selectedMovie.overview || "Sin descripción disponible."}
                </p>

                <div className="mb-4">
                    <p className="text-sm text-gray-500">
                        <strong>Géneros:</strong>{" "}
                        {selectedMovie.genre_ids
                            .map((id) => genreMap[id])
                            .filter(Boolean)
                            .join(", ")}
                    </p>
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
                    >
                        Cancelar
                    </button>
                    <button className="bg-primary-red text-white px-4 py-2 rounded hover:bg-primary-red transition duration-300">
                        Comprar Boleto
                    </button>
                </div>
            </div>
        </div>
    )
}
