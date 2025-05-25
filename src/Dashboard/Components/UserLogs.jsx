
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Clock, Search } from 'lucide-react';

import useAuthStore from '../../Store/authStore';
import { GetLogsUsers } from '../Helpers';

export const UserLogs = () => {
  const token = useAuthStore((state) => state.token);

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const response = await GetLogsUsers(token);
        setLogs(response || []); 
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los logs');
        setLoading(false);
      }
    };
    fetchLogs();
  }, [token]);

  const filteredData = logs.filter((log) =>
    log.user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.id.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-[#e7000b] rounded-lg flex items-center justify-center">
            <Users className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Auditoría de Usuarios</h2>
            <p className="text-sm text-gray-500">Registro de inicios de sesión</p>
          </div>
        </div>

        {/* Búsqueda */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Buscar usuario..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-64 py-2 pl-10 pr-4 text-sm rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e7000b] focus:border-transparent"
          />
        </div>
      </div>

      {/* Estado de carga */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando logs...</p>
        </div>
      )}

      {/* Estado de error */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* Tabla */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Nombre</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Apellido</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Hora Login
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((log, index) => (
                <tr
                  key={log.id}
                  className={`border-b border-gray-100  hover:bg-[#e7000b]/5 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    #{log.id.slice(0, 8)} {/* Mostrar solo los primeros 8 caracteres del UUID */}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{log.user.nombre}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{log.user.apellido}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{`${log.fecha} ${log.hora}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Paginación */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Mostrando {startIndex + 1} a {Math.min(endIndex, filteredData.length)} de {filteredData.length} registros
          </div>

          <div className="flex items-center gap-2">
            {/* Botón Anterior */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </button>

            {/* Números de página */}
            <div className="flex items-center gap-1">
              {getVisiblePages().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && goToPage(page)}
                  disabled={page === '...'}
                  className={`min-w-[2.5rem] h-10 text-sm font-medium rounded-lg transition-colors ${page === currentPage
                      ? 'bg-[#e7000b] text-white'
                      : page === '...'
                        ? 'text-gray-400 cursor-default'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Botón Siguiente */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

     
      {!loading && !error && filteredData.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron resultados</h3>
          <p className="text-gray-500">Intenta con otro término de búsqueda</p>
        </div>
      )}

    </div>
  );
};