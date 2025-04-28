



import { Trash2, ShoppingCart, X } from "lucide-react";

import useAuthStore from '../../Store/authStore';


export const ModalMovieBuy = ( { entradaSeleccionada, cerrarModal, comprarEntradas  } ) => {
  
  const NumeroCuenta = useAuthStore((state) => state.NumeroCuenta);
  const roles = useAuthStore((state) => state.roles);
  
  const precio = roles.includes("VipUsuario") ? 6.9 : 8.9;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl max-w-md w-full relative animate-fadeIn shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-20">
          <img
            src={
              entradaSeleccionada.poster_path
                ? `https://image.tmdb.org/t/p/w500${entradaSeleccionada.poster_path}`
                : "https://via.placeholder.com/500x281?text=No+Image"
            }
            alt={entradaSeleccionada.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <button
            onClick={cerrarModal}
            className="absolute top-4 right-4 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-all"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-1">
            {entradaSeleccionada.title}
          </h3>

          <div className="space-y-1 mb-2">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Numero de cuenta:</span>
              <span className="font-medium">
                {NumeroCuenta}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Sala:</span>
              <span className="font-medium">Sala normal</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Día: </span>
              <span className="font-medium">
                {entradaSeleccionada.dia || "No seleccionado"}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Horario:</span>
              <span className="font-medium">
                {entradaSeleccionada.horario || "No seleccionado"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Cantidad:</span>
              <span className="font-medium">
                {entradaSeleccionada.amount_of_tickets || 1} entrada(s)
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Precio unitario:</span>
              <span className="font-medium">8,90 COP</span>
            </div>

            <div className="flex justify-between items-center py-3 text-lg">
              <span className="font-bold">Total:</span>
              <span className="font-bold text-[#e7000b]">
                {((entradaSeleccionada.amount_of_tickets || 1) * precio).toFixed(2)} COP
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={cerrarModal}
              className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={comprarEntradas}
              className="flex-1 py-2 bg-[#e7000b] text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <ShoppingCart size={18} className="mr-2" />
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
