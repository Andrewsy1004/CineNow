
import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import toast from "react-hot-toast";

import useAuthStore from '../../Store/authStore';
import { createNewBooking } from "../Helpers";


export const Cinemaseats = ({ entradaSeleccionada, cerrarModal, comprarEntradas, asientos, cajero=false , infoUser }) => {
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const [asientosOcupados, setAsientosOcupados] = useState([]);
  
  const roles = cajero ? infoUser?.roles ?? [] : useAuthStore((state) => state.roles);
  const token = cajero ? infoUser?.token ?? '' : useAuthStore((state) => state.token);

  // console.log("token", token);

  const precio = roles.includes("VipUsuario") ? 6.9 : 8.9;


  const filas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const columnas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  // console.log(entradaSeleccionada);
  
  useEffect(() => {    
    setAsientosOcupados(asientos);
  }, []);
  
  // Manejar la selección de asientos
  const toggleAsiento = (asientoId) => {

    if (asientosOcupados.includes(asientoId)) {
      toast.error("Este asiento ya está ocupado");
      return;
    }
    
    // Verificar el límite de selección (no debe exceder la cantidad de entradas)
    if (!asientosSeleccionados.includes(asientoId) && 
        asientosSeleccionados.length >= (entradaSeleccionada.amount_of_tickets || 1)) {
        toast.error(`Solo puedes seleccionar ${entradaSeleccionada.amount_of_tickets} asiento(s)`);
      return;
    }
    
    // Actualizar los asientos seleccionados
    setAsientosSeleccionados(prev => 
      prev.includes(asientoId) 
        ? prev.filter(id => id !== asientoId) 
        : [...prev, asientoId]
    );
  };
  
  // Confirmar la selección de asientos
  const confirmarSeleccion =  async () => {
    if (asientosSeleccionados.length < (entradaSeleccionada.amount_of_tickets || 1)) {
      toast.error(`Debes seleccionar ${entradaSeleccionada.amount_of_tickets} asiento(s)`);
      return;
    }
        
    // Puedes añadir la información de los asientos a la entrada seleccionada
    const entradaConAsientos = {
      ...entradaSeleccionada,
      asientos: asientosSeleccionados
    };
    
    
    const hora_inicio =  entradaConAsientos.horario.split("-")[0].trim();
    const hora_final  =  entradaConAsientos.horario.split("-")[1].trim();

    const DataCreateSeats = {
        posicion:     asientosSeleccionados,
        hora_inicio:  hora_inicio,
        hora_final:   hora_final,
        fecha:        entradaConAsientos.fecha,
        id_pelicula:  entradaConAsientos.id,
        total:        precio * (entradaConAsientos.amount_of_tickets),
        metodo_pago:  "Tarjeta",
    }
    
    const response = await createNewBooking(token, DataCreateSeats);
    
    toast.success(response.msg);

    // Completar el proceso de compra
    comprarEntradas();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-3xl w-full relative animate-fadeIn shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-800">
              Selección de Asientos de {entradaSeleccionada?.title}
            </h3>
            <button
              onClick={cerrarModal}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-all"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
          
          <div className="mb-1">
            <p className="text-gray-600 mb-1">
              {entradaSeleccionada?.title} - {entradaSeleccionada?.dia} - {entradaSeleccionada?.horario}
            </p>
            <p className="text-sm text-gray-500">
              Selecciona {entradaSeleccionada?.amount_of_tickets || 1} asiento(s)
            </p>
          </div>
          
          {/* Leyenda */}
          <div className="flex gap-4 justify-center mb-2">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-gray-200 rounded mr-2"></div>
              <span className="text-sm">Disponible</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-blue-500 rounded mr-2"></div>
              <span className="text-sm">Seleccionado</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-red-500 rounded mr-2"></div>
              <span className="text-sm">Ocupado</span>
            </div>
          </div>
          
          {/* Pantalla */}
          <div className="w-full bg-gray-800 h-2 rounded mb-8 relative">
            <div className="absolute -bottom-6 left-0 right-0 text-center text-sm text-gray-600">
              PANTALLA
            </div>
          </div>
          
          {/* Parrilla de asientos */}
          <div className="mb-2 flex justify-center">
            <div className="grid grid-cols-10 gap-2">
              {filas.map((fila) => (
                columnas.map((columna) => {
                  const asientoId = `${fila}${columna}`;
                  const estaSeleccionado = asientosSeleccionados.includes(asientoId);
                  const estaOcupado = asientosOcupados.includes(asientoId);
                  
                  return (
                    <button
                      key={asientoId}
                      onClick={() => toggleAsiento(asientoId)}
                      disabled={estaOcupado}
                      className={`
                        w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200
                        ${estaOcupado 
                            ? 'bg-red-500 text-white cursor-not-allowed' 
                            : estaSeleccionado 
                                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                : 'bg-gray-200 hover:bg-gray-300'
                        }
                      `}
                      title={estaOcupado ? "Asiento ocupado" : `Asiento ${asientoId}`}
                    >
                      {estaSeleccionado && !estaOcupado ? <Check size={16} /> : <span className="text-xs">{asientoId}</span>}
                    </button>
                  );
                })
              ))}
            </div>
          </div>
          
          {/* Seleccionados e información */}
          <div className="mb-1">
            <p className="font-medium text-center">
              Asientos seleccionados: {asientosSeleccionados.length > 0 
                ? asientosSeleccionados.join(", ") 
                : "Ninguno"}
            </p>
            <p className="text-sm text-center text-gray-500">
              {asientosSeleccionados.length}/{entradaSeleccionada?.amount_of_tickets || 1} asientos seleccionados
            </p>
          </div>
          
          {/* Botones de acción */}
          <div className="flex gap-4">
            <button
              onClick={cerrarModal}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={confirmarSeleccion}
              disabled={asientosSeleccionados.length !== (entradaSeleccionada?.amount_of_tickets || 1)}
              className={`
                flex-1 py-3 rounded-lg font-medium transition-colors flex items-center justify-center
                ${asientosSeleccionados.length == (entradaSeleccionada?.amount_of_tickets || 1)
                  ? 'bg-[#e7000b] text-white hover:bg-red-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
              `}
            >
              Confirmar asientos
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};