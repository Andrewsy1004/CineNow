
import { useState } from "react";

import { X } from "lucide-react";

export const ModalFormUser = ({ selectedMovie,onClose }) => {
  
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   


    setFormData({ nombre: "", apellido: "", correo: "" });
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Datos del Usuario
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} className=" hover:text-primary-red "  />
          </button>
        </div>
        
        {selectedMovie && (
          <div className="mb-4 p-3 bg-gray-100 rounded-lg">
            <p className="font-medium text-[#e7000b]">
              Película: {selectedMovie.title}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e7000b]"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="apellido">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e7000b]"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="correo">
              Correo
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e7000b]"
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#e7000b] text-white rounded hover:bg-[#c60009] transition duration-300"
            >
              Confirmar
            </button>
          </div>

        </form>
        
      </div>
    </div>
  );
};