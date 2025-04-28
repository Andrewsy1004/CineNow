import { useState, useEffect } from "react";
import { Trash2, ShoppingCart, Calendar } from "lucide-react";

import toast from "react-hot-toast";

import useAuthStore from '../../Store/authStore';
import { ModalMovieBuy } from "../Modals";
import { Cinemaseats } from "./Cinemaseats";

export const Entradas = () => {
  const [entradas, setEntradas] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [entradaSeleccionada, setEntradaSeleccionada] = useState(null);
  const [modalAsientosAbierto, setModalAsientosAbierto] = useState(false);

  const NumeroCuenta = useAuthStore((state) => state.NumeroCuenta);
  const roles = useAuthStore((state) => state.roles);

  const precio = roles.includes("VipUsuario") ? 6.9 : 8.9; 

  const horariosDisponibles = [
    { id: 1, label: "10:00 - 12:00", inicio: 10, fin: 12 },
    { id: 2, label: "13:00 - 15:00", inicio: 13, fin: 15 },
    { id: 3, label: "17:00 - 19:00", inicio: 17, fin: 19 },
    { id: 4, label: "20:00 - 22:00", inicio: 20, fin: 22 }
  ];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("entradas")) || [];
    setEntradas(stored);
  }, []);

  const actualizarStorage = (nuevasEntradas) => {
    setEntradas(nuevasEntradas);
    localStorage.setItem("entradas", JSON.stringify(nuevasEntradas));
  };

  const eliminarEntrada = (id) => {
    const nuevasEntradas = entradas.filter((e) => e.id !== id);
    actualizarStorage(nuevasEntradas);
  };

  const actualizarEntrada = (id, campo, valor) => {
    const actualizadas = entradas.map((e) =>
      e.id === id ? { ...e, [campo]: valor } : e
    );
    actualizarStorage(actualizadas);
  };

  const abrirModal = (entrada) => {
    setEntradaSeleccionada(entrada);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const cerrarModalAsientos = () => {
    setModalAsientosAbierto(false);
  };

  const comprarEntradas = () => {
    const { id, fecha, horario, amount_of_tickets } = entradaSeleccionada;

    if (!fecha || !horario) {
      toast.error("Por favor, selecciona una fecha y un horario.");
      return;
    }

    if (amount_of_tickets < 1) {
      toast.error("La cantidad de entradas debe ser al menos 1.");
      return;
    }

    if (!NumeroCuenta) {
      toast.error("Carga tu cuenta para continuar.");
      return;
    }
   
    const fechaSeleccionada = new Date(fecha);
    const diaSemana = fechaSeleccionada.getDay();
    
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');


    if( diaSemana == 6 ){
      toast.error("No se pueden comprar entradas para el domingo");
      return;
    }
    
    const fechaActual = new Date().toISOString().split('T')[0];
    
    if( fecha === fechaActual ){
        // Validar que la hora selecionada sea mayor a la actual        
        const InicioHorario = horario.split(" - ")[0].split(":").join("");
        const FinHorario = horario.split(" - ")[1].split(":").join("");

        if( InicioHorario <= horas ){
          toast.error("No se pueden comprar entradas para horarios pasados !! ");
          return;
        }
    }

    console.log("Entradas compradas:", {
      id,
      fecha,
      horario,
      amount_of_tickets,
      NumeroCuenta,
      precio: ((amount_of_tickets || 1) * precio).toFixed(2)
    });
    
    cerrarModal();
    setModalAsientosAbierto(true);
  };

  // Obtener horarios disponibles basados en la hora actual
  const getHorariosDisponibles = () => {
    const now = new Date();
    const currentHour = now.getHours();

    return horariosDisponibles.filter(horario => horario.inicio > currentHour);
  };

  // Función para validar fechas - solo permitir fechas desde hoy hasta 14 días en adelante
  const getFechaMinima = () => {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  };

  const getFechaMaxima = () => {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 14); 
    return hoy.toISOString().split('T')[0];
  };

  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return "";
    
    const fecha = new Date(fechaISO);
    const opciones = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return fecha.toLocaleDateString('es-ES', opciones);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center">
        <span className="text-3xl mr-2">🎟️</span> Mis Entradas
      </h1>

      {entradas.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <p className="text-xl text-gray-600">No tienes entradas guardadas.</p>
          <p className="text-gray-500 mt-2">Las entradas que reserves aparecerán aquí</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {entradas.map((entrada) => (
            <div
              key={entrada.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300 relative"
            >
              <div className="relative overflow-hidden">
                <img
                  src={
                    entrada.poster_path
                      ? `https://image.tmdb.org/t/p/w500${entrada.poster_path}`
                      : "https://via.placeholder.com/500x281?text=No+Image"
                  }
                  alt={entrada.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 rounded-br-lg text-sm font-semibold">
                  {entrada.amount_of_tickets || 1} entradas
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    eliminarEntrada(entrada.id);
                  }}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full transition-all duration-200"
                >
                  <Trash2 className="text-red-600" size={18} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <h2 className="text-xl font-bold text-[#e7000b] line-clamp-1">
                  {entrada.title}
                </h2>

                <div className="grid grid-cols-1 gap-3 text-sm text-gray-700">
                  {/* Fecha con calendario */}
                  <div>
                    <label className="block text-gray-500 font-medium mb-1">
                      Fecha: {entrada.fecha ? entrada.fecha : "No seleccionada"}
                    </label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="date"
                        min={getFechaMinima()}
                        // max={getFechaMaxima()}
                        value={entrada.fecha || ""}
                        onChange={(e) => actualizarEntrada(entrada.id, "fecha", e.target.value)}
                        className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Horario */}
                  <div>
                    <label className="block text-gray-500 font-medium mb-1">
                      Horario: {entrada.horario || "No seleccionado"}
                    </label>
                    <select
                      value={entrada.horarioId || ""}
                      onChange={(e) => {
                        const selectedHorarioId = parseInt(e.target.value);
                        const selectedHorario = horariosDisponibles.find(h => h.id === selectedHorarioId);
                        actualizarEntrada(entrada.id, "horarioId", selectedHorarioId);
                        actualizarEntrada(entrada.id, "horario", selectedHorario?.label || "");
                      }}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                    >
                      <option value="">Seleccionar horario</option>
                      {horariosDisponibles.map(h => (
                        <option key={h.id} value={h.id}>
                          {h.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Cantidad de entradas */}
                  <div>
                    <label className="block text-gray-500 font-medium mb-1">
                      Nº de entradas: {entrada.amount_of_tickets || 1}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={entrada.amount_of_tickets || 1}
                      onChange={(e) =>
                        actualizarEntrada(
                          entrada.id,
                          "amount_of_tickets",
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                    />
                  </div>
                </div>

                {/* Precio total */}
                {/* <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-gray-500 text-sm">Precio total</p>
                  <p className="text-2xl font-bold text-red-600">
                    €{((entrada.amount_of_tickets || 1) * precio).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {roles.includes("VipUsuario") ? "Precio con descuento VIP" : "Precio estándar"}
                  </p>
                </div> */}

                {/* Botón de compra */}
                <button
                  onClick={() => abrirModal(entrada)}
                  className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg flex items-center justify-center font-medium transition-all duration-300"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Comprar Entradas
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de compra */}
      {modalAbierto && entradaSeleccionada && (
        <ModalMovieBuy 
          entradaSeleccionada={entradaSeleccionada} 
          cerrarModal={cerrarModal} 
          comprarEntradas={comprarEntradas} 
        />
      )}

      {/* Modal de selección de asientos */}
      {modalAsientosAbierto && (
        <Cinemaseats
          entradaSeleccionada={entradaSeleccionada}
          cerrarModal={cerrarModalAsientos}
          comprarEntradas={comprarEntradas}
        />
      )}
    </div>
  );
};