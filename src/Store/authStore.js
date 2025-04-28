
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
        
        
        Login: ( id, correo, nombre, apellido, roles, token, FotoPerfil, NumeroCuenta ) => set({
          id,
          correo,
          nombre,
          apellido,
          roles,
          token,
          Status: true,
          FotoPerfil,
          NumeroCuenta
       }),

        Logout: () => set({
          id: null,
          correo: null,
          nombre: null,
          apellido: null,
          roles: [],
          token: null,
          Status: false,
          FotoPerfil: null,
          NumeroCuenta: null
       }),

       ActualizarPerfil : ( nombre, apellido, correo,FotoPerfil, NumeroCuenta ) => set({
        nombre,
        apellido,
        correo,
        FotoPerfil,
        NumeroCuenta
      }),

        
        
      }),
  
  
      {
        name: 'CineNow-Auth-User',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
  
  export default useAuthStore;
