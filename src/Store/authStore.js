
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


const useAuthStore = create(
    persist(
      (set) => ({
        id: null,
        correo: null,
        nombre: null,
        apellido: null,
        roles: [],
        token: null,
        Status: false,
        FotoPerfil: null,
        
        
        Login: ( id, correo, nombre, apellido, roles, token, FotoPerfil ) => set({
          id,
          correo,
          nombre,
          apellido,
          roles,
          token,
          Status: true,
          FotoPerfil
       }),

        Logout: () => set({
          id: null,
          correo: null,
          nombre: null,
          apellido: null,
          roles: [],
          token: null,
          Status: false,
          FotoPerfil: null
       }),

       ActualizarPerfil : ( nombre, apellido, correo,FotoPerfil ) => set({
        nombre,
        apellido,
        correo,
        FotoPerfil
      }),

        
        
      }),
  
  
      {
        name: 'CineNow-Auth-User',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
  
  export default useAuthStore;
