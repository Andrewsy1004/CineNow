
import { useEffect, useState } from "react";

import { Movie } from "../Cards";

import { getPopularMoviesFromTMDB } from "../../Landing/helpers";
import { getMoviesUpcoming } from "../../Helpers/Tmdb";


export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("cartelera");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const getMovies = async (page) => {
    try {
      setLoading(true);

      const moviesData = await getPopularMoviesFromTMDB(page);
      const moviesUpcoming = await getMoviesUpcoming(page+2);

      setMovies((prevMovies) => {
        const existingIds = new Set(prevMovies.map(movie => movie.id));
        const uniqueNewMovies = moviesData.filter(movie => !existingIds.has(movie.id));
        return [...prevMovies, ...uniqueNewMovies];
      });
      

      setUpcomingMovies((prevMovies) => {
        const existingIds = new Set(prevMovies.map(movie => movie.id));
        const uniqueNewMovies = moviesUpcoming.filter(movie => !existingIds.has(movie.id));
        return [...prevMovies, ...uniqueNewMovies];
      });

    } catch (error) {
      console.error("Error al obtener las películas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies(page);
  }, [page]);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchText(query);

    if (query.trim() === '') {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    if( activeTab === "cartelera"){
      const results = movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(results);
      return;
    }else{
      const results = upcomingMovies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(results);
      return;
    }

  };

  const displayedMovies = isSearching
  ? searchResults
  : activeTab === "cartelera"
  ? movies
  : upcomingMovies;
  

  return (
    <div className="p-4 min-h-screen">

      <h1 className="text-3xl font-bold text-[#e7000b] mb-2 text-center mt-7">
        🎬 Películas
      </h1>
      <div className="w-40 h-1 bg-black rounded-full mx-auto mb-6"></div>

      <div className="mb-6 text-center relative">
        <input
          type="text"
          placeholder="Buscar película..."
          value={searchText}
          onChange={handleSearch}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e7000b] focus:border-transparent"
        />

        {/* Dropdown de resultados estilo Google */}
        {isSearching && searchResults.length > 0 && (
          <div className="absolute z-10 bg-white shadow-lg rounded-lg mt-1 w-full max-w-md mx-auto left-0 right-0">
            {searchResults.slice(0, 5).map(movie => (
              <div
                key={movie.id}
                className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 flex items-center"
                onClick={() => {
                  setSearchText(movie.title);
                  setIsSearching(false);
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path || movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-8 h-12 object-cover mr-2 rounded"
                />
                <span>{movie.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabs para cambiar entre secciones */}
      <div className="flex justify-center space-x-2 mb-6">
        <button
          onClick={() => setActiveTab("cartelera")}
          className={`px-6 py-2 rounded ${activeTab === "cartelera"
            ? "bg-[#e7000b] text-white"
            : "bg-[#fcd5d8] text-black"
            } transition duration-300`}
        >
          Cartelera
        </button>
        <button
          onClick={() => setActiveTab("proximamente")}
          className={`px-6 py-2 rounded ${activeTab === "proximamente"
            ? "bg-[#e7000b] text-white"
            : "bg-[#fcd5d8] text-black"
            } transition duration-300`}
        >
          Próximamente
        </button>
      </div>

      {activeTab === "cartelera" && (
        <>

          <Movie displayedMovies={displayedMovies} />

          {isSearching && searchResults.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No se encontraron películas que coincidan con "{searchText}"</p>
            </div>
          )}

          {!isSearching && (
            <div className="mt-8 text-center">
              {loading ? (
                <p className="text-gray-500">Cargando...</p>
              ) : (
                <button
                  onClick={loadMoreMovies}
                  className="bg-[#e7000b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#c60009] transition duration-300"
                >
                  Cargar más
                </button>
              )}
            </div>
          )}
        </>
      )}


      {activeTab === "proximamente" && (
        <>

          <Movie displayedMovies={displayedMovies} />

          {isSearching && searchResults.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No se encontraron películas que coincidan con "{searchText}"</p>
            </div>
          )}

          {!isSearching && (
            <div className="mt-8 text-center">
              {loading ? (
                <p className="text-gray-500">Cargando...</p>
              ) : (
                <button
                  onClick={loadMoreMovies}
                  className="bg-[#e7000b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#c60009] transition duration-300"
                >
                  Cargar más
                </button>
              )}
            </div>
          )}
        </>
      )}


    </div>
  );
};