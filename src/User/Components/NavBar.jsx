
import { useState } from 'react';

import { ModalUser } from '../Modals/ModalUser';
import useAuthStore from '../../Store/authStore';

export const Navbar = () => {
    const logout = useAuthStore.getState().Logout;
    const fullName = useAuthStore((state) => state.nombre);
    const roles = useAuthStore((state) => state.roles);
    const FotoPerfil = useAuthStore((state) => state.FotoPerfil);

    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const userMenuItems = [
        { label: "Mis entradas", href: "#tickets" },
        { label: "Favoritos", href: "#favorites" },
        { label: "Configuración", href: "#settings" },
    ];

    const handleMenuItemClick = () => {
        setShowUserMenu(false);
    };

    const handleModalUser = () => {
        setShowProfileModal(!showProfileModal);
        setShowUserMenu(false);
    }


    return (
        <>
            <nav className="bg-red-600 text-white shadow-md">

                <div className="flex items-center justify-between px-4 py-2">
                    <button
                        className="md:hidden text-white"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>


                    <div className="font-bold text-xl md:ml-0 mx-auto md:mx-0">CineNow</div>

                    {/* Enlaces de navegación (solo desktop) */}
                    <div className="hidden md:flex space-x-6">
                        <a href="#" className="hover:underline">Cartelera</a>
                        <a href="#" className="hover:underline">Próximos Estrenos</a>
                        <a href="#" className="hover:underline">Géneros</a>
                    </div>

                    {/* Perfil de usuario */}
                    <div className="relative">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => setShowUserMenu(!showUserMenu)}
                        >
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                <img src={FotoPerfil} alt="Avatar" className="h-full w-full object-cover" />
                            </div>
                            <div className="ml-2 flex flex-col text-xs">
                                <span> {fullName} </span>
                                <span className="opacity-70"> {roles} </span>
                            </div>

                        </div>

                        {/* Menú desplegable de usuario */}
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">

                                <button
                                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                                    onClick={handleModalUser} >
                                    Mi Perfil
                                </button>

                                {userMenuItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                                        onClick={handleMenuItemClick}
                                    >
                                        {item.label}
                                    </a>
                                ))}

                                <button
                                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                                    onClick={logout} >
                                    Cerrar Sesión
                                </button>

                            </div>
                        )}
                    </div>
                </div>


                {/* Menú móvil desplegable */}
                {showMobileMenu && (
                    <div className="md:hidden bg-red-700 px-2 py-1">
                        <a href="#" className="block py-1 hover:bg-red-800 px-1 rounded text-sm text-white">Cartelera</a>
                        <a href="#" className="block py-1 hover:bg-red-800 px-1 rounded text-sm text-white">Próximos Estrenos</a>
                        <a href="#" className="block py-1 hover:bg-red-800 px-1 rounded text-sm text-white">Géneros</a>
                    </div>
                )}
            </nav>


            {showProfileModal && <ModalUser setShowProfileModal={handleModalUser} />}

        </>
    );
};