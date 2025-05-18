
import { useEffect, useState } from "react";

import { Calendar, Clock, Film, Users, MapPin, QrCode, Ticket, ChevronLeft, ChevronRight } from "lucide-react";

import useAuthStore from '../../Store/authStore';
import { GetUserTickets } from "../Helpers/Movies";


export const Tickets = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 2;

  const token = useAuthStore((state) => state.token);

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);


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


  const UserTicket = async () => {
    setLoading(true);

    const response = await GetUserTickets(token);
    if (response.status) {
      setTickets(response.data.tickets);
    } else {
      console.error("Error al obtener los tickets:", response.message);
    }

    setLoading(false);

  }

  useEffect(() => {
    UserTicket();
  }, [token]);

  return (
    <>

      <div className="p-6 max-w-4xl mx-auto min-h-screen">

        <h1 className="text-2xl font-bold mb-3 flex items-center text-[#1E2939]">
          <Ticket className="mr-2 text-[#E40808]" size={24} />
          Tus Tickets
        </h1>


        {
          loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-red"></div>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {currentTickets.map((ticket) => (
                  <div key={ticket.ID} className="bg-white rounded-lg shadow-lg overflow-hidden">

                    <div className="px-6 py-4 bg-gradient-to-r from-[#E40808] to-[#c70707]">
                      <div className="flex justify-between items-center">
                        <h2 className="text-white font-bold text-xl">{ticket.Película}</h2>
                        <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-[#E40808]">
                          {ticket.ID}
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
                              <p className="font-medium text-[#1E2939]">{ticket.Fecha}</p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-3 text-[#E40808]" />
                            <div>
                              <p className="text-sm text-gray-500">Hora</p>
                              <p className="font-medium text-[#1E2939]">{ticket.Hora}</p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <Film className="h-5 w-5 mr-3 text-[#E40808]" />
                            <div>
                              <p className="text-sm text-gray-500">Sala</p>
                              <p className="font-medium text-[#1E2939]">{ticket.Sala}</p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <Users className="h-5 w-5 mr-3 text-[#E40808]" />
                            <div>
                              <p className="text-sm text-gray-500">Asientos</p>
                              <p className="font-medium text-[#1E2939]">{(ticket.Entradas)}</p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 mr-3 text-[#E40808]" />
                            <div>
                              <p className="text-sm text-gray-500">Ubicación</p>
                              <p className="font-medium text-[#1E2939]"> CineNow </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Código QR y precio */}
                      <div className="p-6 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-200 bg-gray-50/70">
                        <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow mb-4">
                          <QrCode className="h-32 w-32 text-[#1E2939]" />
                        </div>
                        <div className="px-4 py-2 rounded font-bold bg-red-100 text-[#E40808]">
                          Total: ${ticket.Total}
                        </div>
                      </div>
                    </div>

                    {/* Pie del ticket */}
                    <div className="border-t border-dashed border-gray-200 px-6 py-4 bg-gray-50/70">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          Presenta este ticket en la entrada del cine
                        </p>
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
                    className={`flex items-center p-2 rounded-full transition-colors ${currentPage === 1 ? 'bg-gray-300 opacity-50' : 'bg-[#E40808] hover:opacity-90'
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
                    className={`flex items-center p-2 rounded-full transition-colors ${currentPage === totalPages ? 'bg-gray-300 opacity-50' : 'bg-[#E40808] hover:opacity-90'
                      } text-white`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )
        }



      </div>

    </>
  );
};