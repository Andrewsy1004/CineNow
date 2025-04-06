import useMovieStore from "../../Store/movieStore";
import { genreMap } from "../../Constants";
import { SlideMovies } from "../Components/SlideMovies";
import { getActorsFromMovie } from "../../Helpers";
import { useEffect, useState } from "react";

const baseImageUrl = "https://image.tmdb.org/t/p/";
const backdropSize = "original";

export const MoviePage = () => {
  const movie = useMovieStore((state) => state);
  const [actors, setActors] = useState([]);

  const handleGetActors = async () => {
    try {
      const actorsData = await getActorsFromMovie(movie.id);
      setActors(actorsData);
    } catch (error) {
      console.error("Error al obtener los actores:", error);
    }
  };

  useEffect(() => {
    handleGetActors();
  }, []);

  return (
    <main className="flex flex-col items-center">
      <section>
        <div className="rounded-4xl overflow-hidden h-full sm:h-[70dvh] w-[80dvw]">
          <img
            className="h-full w-full object-contain sm:object-cover rounded-2xl"
            src={`${baseImageUrl}${backdropSize}${movie.poster_path}`}
            alt={`Póster de ${movie.title}`}
          />
        </div>
      </section>
      <section className="w-[80dvw] p-5 sm:p-10">
        <aside className=" font-bold text-3xl sm:text-5xl w-full flex sm:flex-row flex-col justify-between">
          <span>
            <h1>{movie.title}</h1>
            <div className="sm:flex gap-5 max-w-[85%] flex-wrap hidden">
              {movie.genre_ids.map((id) => (
                <span
                  key={id}
                  className="text-base font-normal bg-[#D9D9D9] py-2 px-10 rounded-lg mt-5 min-w-fit"
                >
                  {genreMap[id]}
                </span>
              ))}
            </div>
          </span>
          <p className="sm:mt-0 mt-5 sm:text-3xl text-lg font-normal">{movie.vote_average} ⭐</p>
        </aside>
        <article>
          <h2 className="text-3xl font-bold sm:mt-10 mt-5">Sinopsis</h2>
          <p className="text-lg font-normal mt-5">{movie.overview}</p>
        </article>
        <article>
          <h2 className="text-3xl font-bold mt-10 mb-10">Reparto principal</h2>
          <div className="grid sm:grid-cols-4 grid-cols-1 gap-5">
            {actors &&
              actors.map((actor) => (
                <div className="flex flex-col items-center h-80" key={actor.id}>
                  <div className="h-[80%] w-full rounded-lg overflow-hidden">
                    <img
                      className="h-full w-full object-cover rounded-lg hover:scale-115 transition-transform duration-300"
                      src={`${baseImageUrl}${backdropSize}${actor.profile_path}`}
                      alt={`Póster de ${actor.name}`}
                    />
                  </div>
                  <p className="text-lg">{actor.name}</p>
                  <p className="text-base">{actor.character}</p>
                </div>
              ))}
          </div>
        </article>
        <aside className="w-full mt-10 text-center text-3xl">
          <button className="bg-primary-red text-secondary-white py-2 px-10 rounded-lg cursor-pointer hover:bg-red-700 transition-all">Reservar</button>
        </aside>
      </section>
    </main>
  );
};
