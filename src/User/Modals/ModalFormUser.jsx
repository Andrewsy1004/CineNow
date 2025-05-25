
import { useState } from "react";

import { X } from "lucide-react";
import toast from "react-hot-toast";
import { RegistrarUsuario, RegistrarUsuarioPorCajero } from "../../Auth/helpers/User";

export const ModalFormUser = ({ selectedMovie,onClose, setModalPelicula, setInfoUser }) => {
  
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    MetodoPago: "",
    NumeroCuenta: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    
    // Aquí puedes manejar el envío del formulario
    const { nombre, apellido, correo, MetodoPago, NumeroCuenta } = formData; 
    
    // Validación simple
    if (!formData.nombre || !formData.apellido || !formData.correo || !formData.MetodoPago) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (formData.MetodoPago == "Tarjeta de Crédito" && !formData.NumeroCuenta) {
      toast.error("Por favor, ingresa el número de tarjeta.");
      return;
    }

    // console.log("Datos del formulario:", formData);

    let response;
    if (MetodoPago === "Tarjeta de Crédito") {
      response = await RegistrarUsuarioPorCajero(nombre, apellido, correo, NumeroCuenta);
    } else {
      response = await RegistrarUsuarioPorCajero(nombre, apellido, correo, "");
    }

    if (response.status) {
      toast.success(response.message);
      setInfoUser(response.data);
    }
    
    setModalPelicula(true);

    setFormData({
      nombre: "",
      apellido: "",
      correo: "",
      MetodoPago: "",
      NumeroCuenta: ""
    });

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
              Película: {selectedMovie.titulo}
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

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="MetodoPago">
              Método de Pago
            </label>
            <select
              id="MetodoPago"
              name="MetodoPago"
              value={formData.MetodoPago}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e7000b]"
            >
              <option value="">Seleccionar</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
            </select>
          </div>

          {  formData.MetodoPago === "Tarjeta de Crédito" && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="NumeroCuenta">
                Número de Tarjeta
              </label>
              <input
                type="text"
                id="NumeroCuenta"
                name="NumeroCuenta"
                value={formData.NumeroCuenta}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e7000b]"
              />
            </div>
          )
           
          }
          
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