import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/* adult
: 
false
backdrop_path
: 
"/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg"
genre_ids
: 
(4) [10751, 35, 12, 14]
id
: 
950387
original_language
: 
"en"
original_title
: 
"A Minecraft Movie"
overview
: 
"Cuatro inadaptados se encuentran luchando con problemas ordinarios cuando de repente se ven arrastrados a través de un misterioso portal al Mundo Exterior: un extraño país de las maravillas cúbico que se nutre de la imaginación. Para volver a casa, tendrán que dominar este mundo mientras se embarcan en una búsqueda mágica con un inesperado experto artesano, Steve."
popularity
: 
681.3142
poster_path
: 
"/qNEmbTNjf5hVzecPq96pxGfBhbX.jpg"
release_date
: 
"2025-03-31"
title
: 
"Una película de Minecraft"
video
: 
false
vote_average
: 
6.015
vote_count
: 
169 */

const useMovieStore = create(
  persist(
    (set) => ({
      select: (
        id,
        original_language,
        original_title,
        overview,
        popularity,
        genre_ids,
        poster_path,
        release_date,
        title,
        video,
        vote_average,
        backdrop_path,
        vote_count
      ) =>
        set({
          id,
          original_language,
          original_title,
          overview,
          popularity,
          genre_ids,
          poster_path,
          release_date,
          title,
          video,
          vote_average,
          backdrop_path,
          vote_count,
        }),

      reset: () => set(null),
    }),

    {
      name: "CineNow-Movie-Store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useMovieStore;
