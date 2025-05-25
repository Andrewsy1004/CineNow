
import { useState, useEffect } from 'react';
import { Users, Search, Mail, Shield, X, Edit, Trash2 } from 'lucide-react';

import useAuthStore from '../../Store/authStore';
import { GetUsers } from '../Helpers';
import { UserModal } from '../Modals/UserModal';

export const UsersProfile = () => {

  const token = useAuthStore((state) => state.token);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await GetUsers(token);
        setUsers(response || []);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los usuarios');
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  const filteredUsers = users.filter((user) =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-[#e7000b] rounded-lg flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Gestión de Usuarios</h2>
              <p className="text-sm text-gray-500">{filteredUsers.length} usuarios registrados</p>
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
            <p className="text-gray-500">Cargando usuarios...</p>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Correo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Estado</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    className={`border-b border-gray-100 hover:bg-[#e7000b]/5 cursor-pointer transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      #{user.id.slice(0, 8)} {/* Mostrar solo los primeros 8 caracteres del UUID */}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700 font-medium">{user.nombre}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{user.apellido}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.correo}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${user.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${user.activo ? 'bg-green-500' : 'bg-red-500'}`}
                        ></div>
                        {user.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
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
              Mostrando {startIndex + 1} a {Math.min(endIndex, filteredUsers.length)} de {filteredUsers.length} usuarios
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              <span className="px-3 py-2 text-sm font-medium text-gray-700">
                {currentPage} de {totalPages}
              </span>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* Estado vacío */}
        {!loading && !error && filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron usuarios</h3>
            <p className="text-gray-500">Intenta con otro término de búsqueda</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <UserModal selectedUser={selectedUser} closeModal={() => setShowModal(false)} />
      )}



    </>
  );
};