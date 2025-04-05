

import axios from 'axios';

import useAuthStore from '../../Store/authStore';


const host = import.meta.env.VITE_API_BASE_URL;


export const ActualizarInfoUser = async (token, dataUser  ) => {
    const ActualizarInfoUser = useAuthStore.getState().ActualizarPerfil

    try {

        const response = await axios.patch(`${host}/auth/updateInfoUser`, dataUser, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        ActualizarInfoUser(dataUser.nombre, dataUser.apellido, dataUser.correo, dataUser.FotoPerfil);  
        
        return {
            status: true,
            message: " Información actualizada correctamente"
        }
    

    } catch (error) {
        return {
            status: false,
            message: error.response.data.message
        }
    }
}