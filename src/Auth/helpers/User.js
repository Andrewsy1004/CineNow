
import useAuthStore from '../../Store/authStore';

import axios from 'axios';

const host = import.meta.env.VITE_API_BASE_URL;

export const IniciarSesion = async (emailUser, contrasena) => {
   const Login = useAuthStore.getState().Login

   try {
      const response = await axios.post(`${host}/auth/login`, { correo: emailUser, contrasena });

      const { id, correo, nombre, apellido, roles, token, FotoPerfil, NumeroCuenta } = response.data;

      Login(id, correo, nombre, apellido, roles, token, FotoPerfil, NumeroCuenta);

      // Login("1234", "andres.sy", "andres", "felipe", ["Administrador"], "1234TOKEN", "HTTP:IMG", "123 456 789"  )

      return {
         status: true,
         message: "Inicio de sesión exitoso"
      }

   } catch (error) {
      return {
         status: false,
         message: error.response.data.message
      }
   }
}


export const RegistrarUsuario = async (nombreUser, apellidoUser, emailUser, contrasena) => {
   const Login = useAuthStore.getState().Login

   try {

      const response = await axios.post(`${host}/auth/register`, { nombre: nombreUser, apellido: apellidoUser, correo: emailUser, contrasena });

      const { id, correo, nombre, apellido, roles, token, FotoPerfil } = response.data;

      Login(id, correo, nombre, apellido, roles, token, FotoPerfil);

      return {
         status: true,
         message: "Usuario registrado exitosamente"
      }

   } catch (error) {

      if ( error.response?.status === 400 && error.response?.data?.message.includes('Key (correo)=') ) {
         return {
            status: false,
            message: "Este correo electrónico ya está registrado. Por favor, utiliza otro correo electrónico.",
         };
      }

      return {
         status: false,
         message: error.response?.data?.message || "Error al registrar el usuario",
      };

   }
}


export const RegistrarUsuarioPorCajero = async (nombreUser, apellidoUser, emailUser, NumeroCuenta) => {

   try {
      
      const response = await axios.post(`${host}/auth/registerUser`, { nombre: nombreUser, apellido: apellidoUser, correo: emailUser, contrasena: emailUser , NumeroCuenta });

      return {
         status: true,
         message: "Usuario registrado exitosamente",
         data: response.data
      }

      

   } catch (error) {

      if ( error.response?.status === 400 && error.response?.data?.message.includes('Key (correo)=') ) {
         return {
            status: false,
            message: "Este correo electrónico ya está registrado. Por favor, utiliza otro correo electrónico.",
         };
      }

      return {
         status: false,
         message: error.response?.data?.message || "Error al registrar el usuario",
      };

   }
}