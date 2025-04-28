
import { useState } from 'react';
import { X, Pencil } from "lucide-react";
import toast from "react-hot-toast";

import useAuthStore from '../../Store/authStore';
import { ActualizarInfoUser } from '../Helpers';
import { fileUpload } from '../../Helpers';

export const ModalUser = ({ setShowProfileModal }) => {

  const [uploading, setUploading] = useState(false);

  const nombre = useAuthStore((state) => state.nombre);
  const apellido = useAuthStore((state) => state.apellido);
  const correo = useAuthStore((state) => state.correo);
  const FotoPerfil = useAuthStore((state) => state.FotoPerfil);
  const token  = useAuthStore((state) => state.token);
  const NumeroCuenta = useAuthStore((state) => state.NumeroCuenta);


  const [formData, setFormData] = useState({
    nombre: nombre || '',
    apellido: apellido || '',
    correo: correo || '',
    FotoPerfil: FotoPerfil || '',
    NumeroCuenta: NumeroCuenta || ''
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      try {
        const imageUrl = await fileUpload(file);
        setFormData({ ...formData, FotoPerfil: imageUrl });
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
     
    const response = await ActualizarInfoUser( token, formData )
    
    if (response.status) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    setShowProfileModal(false);
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Actualizar Perfil</h2>
          <button
            onClick={() => setShowProfileModal(false)}
            className="text-gray-500 hover:text-primary-red"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className='flex justify-center'>
            <div className="mt-2 flex items-center">
              <div className="relative">
                {formData.FotoPerfil ? (
                  <img
                    src={formData.FotoPerfil}
                    alt="Foto de perfil"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-2xl">👤</span>
                  </div>
                )}
                <label
                  htmlFor="file-upload"
                  className="absolute bottom-0 right-0 bg-primary-red text-white rounded-full h-6 w-6 flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors"
                >
                  <span className="text-sm ">  
                     <Pencil className="w-4 h-4" /> 
                  </span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={uploading}
                />
              </div>
              {uploading && <p className="ml-4 text-sm text-gray-500">Subiendo imagen...</p>}
            </div>
          </div>

          <div>
            <label htmlFor='nombre' className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              id = 'nombre'
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 "
              placeholder="Ingresa tu nombre"
            />
          </div>

          <div>
            <label htmlFor='apellido' className="block text-sm font-medium text-gray-700">Apellido</label>
            <input
              type="text"
              id = 'apellido'
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1"
              placeholder="Ingresa tu apellido"
            />
          </div>

          <div>
            <label htmlFor='correo' className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              type="email"
              id = 'correo'
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1"
              placeholder="Ingresa tu correo"
            />
          </div>

          <div>
            <label htmlFor='NumeroCuenta' className="block text-sm font-medium text-gray-700">Número de cuenta</label>
            <input
              type="text"
              id = 'NumeroCuenta'
              name="NumeroCuenta"
              value={formData.NumeroCuenta}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1"
              placeholder="Ingresa tu número de cuenta"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-red text-white py-2 rounded-md hover:bg-red-700 transition-colors duration-200 disabled:bg-gray-400"
            disabled={uploading}
          >
            Actualizar
          </button>

        </form>

      </div>
    </div>
  );
};