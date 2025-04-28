
import { useState } from "react";

import { Calendar, Clock, Film, Users, MapPin, QrCode, Ticket, ChevronLeft, ChevronRight } from "lucide-react";

export const Tickets = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 2;

  const [tickets, setTickets] = useState([
    {
      id: "TKT-2587",
      pelicula: "Dune: Parte 2",
      fecha: "15/05/2024",
      hora: "19:30",
      sala: "Sala 3D - 4",
      asientos: ["F5", "F6", "F7"],
      precio: 24.50,
      codigo: "DUN24980BX3",
      ubicacion: "CineNow"
    },
    {
      id: "TKT-2588",
      pelicula: "Godzilla vs Kong",
      fecha: "20/04/2024", 
      hora: "21:15",
      sala: "Sala Premium - 2",
      asientos: ["C12", "C13"],
      precio: 16.00,
      codigo: "GDZ24567AX2",
      ubicacion: "CineNow"
    },
    {
      id: "TKT-2589",
      pelicula: "Interstellar",
      fecha: "10/03/2024",
      hora: "17:45",
      sala: "Sala 4DX - 1",
      asientos: ["A1", "A2", "A3", "A4"],
      precio: 8.50,
      codigo: "INT23456BX1",
      ubicacion: "CineNow"
    },
    {
      id: "TKT-2590",
      pelicula: "El Padrino",
      fecha: "05/06/2024",
      hora: "20:00",
      sala: "Sala Clásica - 3",
      asientos: ["D8", "D9"],
      precio: 12.75,
      codigo: "PAD24123CX5",
      ubicacion: "CineNow"
    },
    {
      id: "TKT-2591",
      pelicula: "Matrix",
      fecha: "12/07/2024",
      hora: "18:30",
      sala: "Sala IMAX - 1",
      asientos: ["G7", "G8", "G9"],
      precio: 19.90,
      codigo: "MTX24785DX7",
      ubicacion: "CineNow"
    }
  ]);


  // Calcular tickets para la página actual
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  // Lógica de paginación
  const totalPages = Math.ceil(tickets.length / ticketsPerPage);
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatearAsientos = (asientos) => {
    return asientos.join(", ");
  };



  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      
      <h1 className="text-2xl font-bold mb-3 flex items-center text-[#1E2939]">
        <Ticket className="mr-2 text-[#E40808]" size={24} /> 
        Tus Tickets
      </h1>
       
      <div className="space-y-6">
        {currentTickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-lg shadow-lg overflow-hidden">

            <div className="px-6 py-4 bg-gradient-to-r from-[#E40808] to-[#c70707]">
              <div className="flex justify-between items-center">
                <h2 className="text-white font-bold text-xl">{ticket.pelicula}</h2>
                <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-[#E40808]">
                  {ticket.id}
                </span>
              </div>
            </div>
            
            {/* Cuerpo del ticket */}
            <div className="flex flex-col md:flex-row">
              {/* Información principal */}
              <div className="p-6 flex-1">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-[#E40808]" />
                    <div>
                      <p className="text-sm text-gray-500">Fecha</p>
                      <p className="font-medium text-[#1E2939]">{ticket.fecha}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-[#E40808]" />
                    <div>
                      <p className="text-sm text-gray-500">Hora</p>
                      <p className="font-medium text-[#1E2939]">{ticket.hora}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Film className="h-5 w-5 mr-3 text-[#E40808]" />
                    <div>
                      <p className="text-sm text-gray-500">Sala</p>
                      <p className="font-medium text-[#1E2939]">{ticket.sala}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-3 text-[#E40808]" />
                    <div>
                      <p className="text-sm text-gray-500">Asientos</p>
                      <p className="font-medium text-[#1E2939]">{formatearAsientos(ticket.asientos)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-[#E40808]" />
                    <div>
                      <p className="text-sm text-gray-500">Ubicación</p>
                      <p className="font-medium text-[#1E2939]">{ticket.ubicacion}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Código QR y precio */}
              <div className="p-6 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-200 bg-gray-50/70">
                <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow mb-4">
                  <QrCode className="h-32 w-32 text-[#1E2939]" />
                </div>
                <p className="text-sm text-gray-500 mb-1">Código de entrada</p>
                <p className="font-mono font-bold mb-4 text-[#1E2939]">{ticket.codigo}</p>
                <div className="px-4 py-2 rounded font-bold bg-red-100 text-[#E40808]">
                  Total: ${ticket.precio.toFixed(2)}
                </div>
              </div>
            </div>
            
            {/* Pie del ticket */}
            <div className="border-t border-dashed border-gray-200 px-6 py-4 bg-gray-50/70">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Presenta este ticket en la entrada del cine
                </p>
                <button className="bg-[#1E2939] text-white py-2 px-4 rounded hover:opacity-90 transition-opacity text-sm">
                  Descargar PDF
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
      
      {/* Paginación */}
      {tickets.length > ticketsPerPage && (
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button 
            onClick={goToPreviousPage} 
            disabled={currentPage === 1}
            className={`flex items-center p-2 rounded-full transition-colors ${
              currentPage === 1 ? 'bg-gray-300 opacity-50' : 'bg-[#E40808] hover:opacity-90'
            } text-white`}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="text-lg font-medium text-[#1E2939]">
            {currentPage} de {totalPages}
          </div>
          
          <button 
            onClick={goToNextPage} 
            disabled={currentPage === totalPages}
            className={`flex items-center p-2 rounded-full transition-colors ${
              currentPage === totalPages ? 'bg-gray-300 opacity-50' : 'bg-[#E40808] hover:opacity-90'
            } text-white`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
      
      {/* <div className="mt-8 flex justify-center">
        <button className="bg-[#E40808] text-white py-3 px-6 rounded-lg hover:opacity-90 transition-opacity text-base font-medium">
          Volver a la página principal
        </button>
      </div> */}
      
    </div>
  );
};