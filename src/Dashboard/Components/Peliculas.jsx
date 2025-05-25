

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Film, Search } from 'lucide-react';

import useAuthStore from '../../Store/authStore';
import { getMoviesWithPagination } from '../../Helpers';
import { ModalMovie } from '../../User/Modals';
import { genreMap } from '../../Constants';

export const Peliculas = () => {
  const token = useAuthStore((state) => state.token);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage] = useState(10);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalMovies = 59;
  const totalPages = Math.ceil(totalMovies / itemsPerPage);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getMovies = async (page) => {
    try {
      setLoading(true);
      const moviesData = await getMoviesWithPagination(page, token);
      setMovies((prevMovies) => {
        const existingIds = new Set(prevMovies.map((movie) => movie.id));
        const uniqueNewMovies = moviesData.filter((movie) => !existingIds.has(movie.id));
        return [...prevMovies, ...uniqueNewMovies].slice(0, totalMovies);
      });
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las películas:', error);
      setError('Error al cargar las películas');
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies(1);
  }, [token]);

  const filteredData = movies.filter(
    (movie) =>
      movie.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.id.toString().includes(searchTerm)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      getMovies(newPage);
    }
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-[#e7000b] rounded-lg flex items-center justify-center">
              <Film className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Lista de Películas</h2>
              <p className="text-sm text-gray-500">Catálogo de películas disponibles</p>
            </div>
          </div>

          {/* Búsqueda */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Buscar película..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-64 py-2 pl-10 pr-4 text-sm rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e7000b] focus:border-transparent"
            />
          </div>
        </div>

        {/* Estado de carga */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Cargando películas...</p>
          </div>
        )}

        {/* Estado de error */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Tabla */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Título</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Géneros</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Fecha de Lanzamiento</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Promedio</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((movie, index) => (
                  <tr
                    key={movie.id}
                    className={`border-b border-gray-100 hover:bg-[#e7000b]/5 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                    onClick={() => openModal(movie)}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">#{movie.id.slice(0, 8)}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{movie.titulo}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{movie.generos.join(', ')}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{movie.fecha_lanzamiento}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{parseFloat(movie.promedio).toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Paginación */}
        {!loading && !error && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Mostrando {startIndex + 1} a {Math.min(endIndex, filteredData.length)} de {totalMovies} películas
            </div>

            <div className="flex items-center gap-2">
              {/* Botón Anterior */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </button>

              {/* Números de página */}
              <div className="flex items-center gap-1">
                {getVisiblePages().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && goToPage(page)}
                    disabled={page === '...'}
                    className={`min-w-[2.5rem] h-10 text-sm font-medium rounded-lg transition-colors ${page === currentPage
                      ? 'bg-[#e7000b] text-white'
                      : page === '...'
                        ? 'text-gray-400 cursor-default'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </button>

            </div>
          </div>
        )}

        {/* Sin resultados */}
        {!loading && !error && filteredData.length === 0 && (
          <div className="text-center py-12">
            <Film className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron resultados</h3>
            <p className="text-gray-500">Intenta con otro término de búsqueda</p>
          </div>
        )}

      </div>

      {isModalOpen && selectedMovie && (
        <ModalMovie
          selectedMovie={selectedMovie}
          genreMap={genreMap}
          closeModal={ closeModal }
        />
      )}

    </>
  );
};