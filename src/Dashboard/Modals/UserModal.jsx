
import { Users, X, Mail, Shield } from "lucide-react";

export const UserModal = ({ selectedUser, closeModal }) => {
    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full overflow-y-auto">

                {/* Header del Modal */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-[#e7000b] rounded-lg flex items-center justify-center">
                            <Users className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                {selectedUser.nombre} {selectedUser.apellido}
                            </h3>
                            <p className="text-sm text-gray-500">ID: #{selectedUser.id.slice(0, 8)}</p>
                        </div>
                    </div>
                    <button onClick={closeModal} className="p-2 rounded-lg transition-colors">
                        <X className="h-5 w-5 text-gray-400 hover:text-red-500" />
                    </button>
                </div>

                {/* Contenido del Modal */}
                <div className="p-4">
                    {/* Estado del usuario */}
                    <div className="flex items-center gap-4 p-4  rounded-lg">
                        <span
                            className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${selectedUser.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}
                        >
                            <div
                                className={`w-3 h-3 rounded-full ${selectedUser.activo ? 'bg-green-500' : 'bg-red-500'}`}
                            ></div>
                            {selectedUser.activo ? 'Usuario Activo' : 'Usuario Inactivo'}
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            <Shield className="h-3 w-3" />
                            {selectedUser.roles.join(', ')}
                        </span>
                    </div>

                    {/* Información del usuario */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Información Personal</h4>

                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Correo Electrónico</p>
                                <p className="text-sm text-gray-600">{selectedUser.correo}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Número de Cuenta</p>
                                <p className="text-sm text-gray-600">
                                    {selectedUser.NumeroCuenta || 'No disponible'}
                                </p>
                            </div>
                        </div>

                        {selectedUser.FotoPerfil && (
                            <div className="flex items-center gap-3">
                                <div className="h-5 w-5 text-gray-400">
                                    <img
                                        src={selectedUser.FotoPerfil}
                                        alt="Foto de perfil"
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Foto de Perfil</p>
                                    <p className="text-sm text-gray-600">Disponible</p>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}
