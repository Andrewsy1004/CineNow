
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { Film, CalendarDays, Tag, Clock, MonitorPlay, Search, Users, BarChart3, Settings, Home, ChevronDown, Menu, X, LogOut } from "lucide-react";

import { ModalUser } from "../../User/Modals/ModalUser";

import useAuthStore from '../../Store/authStore';

export const DashboardAdmin = ({ children }) => {

    const logout = useAuthStore.getState().Logout;
    const fullName = useAuthStore((state) => state.nombre);
    const roles = useAuthStore((state) => state.roles);
    const FotoPerfil = useAuthStore((state) => state.FotoPerfil);

    const [showProfileModal, setShowProfileModal] = useState(false);

    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("dashboard");
    const [expandedMenus, setExpandedMenus] = useState({
        "now-playing": false,
        "upcoming": false,
        "genres": false,
        "showtimes": false,
        "theaters": false,
        "users": false
    });

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleMenu = (menu) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    const handleNavigation = (section, subsection = "overview") => {
        setActiveSection(section);
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    const handleModalUser = () => {
        setShowProfileModal(!showProfileModal);
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };


    return (
        <>
            <div className="flex h-screen w-full overflow-hidden bg-gray-50">

                {/* Mobile Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 backdrop-blur-sm  z-20 md:hidden"
                        onClick={toggleSidebar}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`fixed md:static inset-y-0 left-0 z-30 w-64 flex flex-col
                   bg-white border-r border-gray-200 
                   shadow-lg transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-[#e7000b] text-white">
                        <h1 className="text-xl font-bold tracking-wide">CineNow</h1>
                        <button className="ml-auto md:hidden hover:bg-[#b30009] p-1 rounded" onClick={toggleSidebar}>
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto py-4">
                        <nav className="px-3">
                            <ul className="space-y-2">
                                {/* Dashboard */}
                                <li>
                                    <Link to="/dashboard"
                                        onClick={() => handleNavigation("dashboard")}
                                        className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                            ${activeSection === "dashboard"
                                                ? "bg-[#e7000b]/10 text-[#e7000b] border-l-4 border-[#e7000b]"
                                                : "text-gray-700 hover:bg-[#e7000b]/10 hover:text-[#e7000b]"}`}
                                    >
                                        <Home className="h-5 w-5" />
                                        <span>Dashboard</span>
                                    </Link>



                                </li>

                                {/* Películas en Cartelera */}
                                <li>
                                    <div className="flex flex-col">
                                        <button
                                            onClick={() => toggleMenu("now-playing")}
                                            className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                             ${activeSection === "now-playing"
                                                    ? "bg-[#e7000b]/10 text-[#e7000b] border-l-4 border-[#e7000b]"
                                                    : "text-gray-700 hover:bg-[#e7000b]/10 hover:text-[#e7000b]"}`}
                                        >
                                            <Film className="h-5 w-5" />
                                            <span>Películas</span>
                                            <ChevronDown className={`ml-auto h-4 w-4 transition-transform duration-200 ${expandedMenus["now-playing"] ? "rotate-180" : ""}`} />
                                        </button>

                                        {expandedMenus["now-playing"] && (
                                            <ul className="mt-2 ml-8 space-y-1 border-l-2 border-gray-200 pl-4">
                                                <li>
                                                    <Link
                                                        to="/dashboard/Peliculas"
                                                        className="w-full text-left px-3 py-2 text-sm text-gray-600 rounded-md hover:bg-[#e7000b]/10 hover:text-[#e7000b] transition-colors "
                                                        onClick={() => handleNavigation("now-playing", "Peliculas")}
                                                    >
                                                        Peliculas
                                                    </Link>
                                                </li>


                                            </ul>
                                        )}
                                    </div>
                                </li>



                                {/* Usuarios */}
                                <li>
                                    <div className="flex flex-col">
                                        <button
                                            onClick={() => toggleMenu("users")}
                                            className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                             ${activeSection === "users"
                                                    ? "bg-[#e7000b]/10 text-[#e7000b] border-l-4 border-[#e7000b]"
                                                    : "text-gray-700 hover:bg-[#e7000b]/10 hover:text-[#e7000b]"}`}
                                        >
                                            <Users className="h-5 w-5" />
                                            <span>Usuarios</span>
                                            <ChevronDown className={`ml-auto h-4 w-4 transition-transform duration-200 ${expandedMenus["users"] ? "rotate-180" : ""}`} />
                                        </button>

                                        {expandedMenus["users"] && (
                                            <ul className="mt-2 ml-8 space-y-1 border-l-2 border-gray-200 pl-4">

                                                <li>
                                                    <Link
                                                        to="/dashboard/Usuarios"
                                                        className="w-full text-left px-3 py-2 text-sm text-gray-600 rounded-md hover:bg-[#e7000b]/10 hover:text-[#e7000b] transition-colors "
                                                        onClick={() => handleNavigation("users", "profiles")}
                                                    >
                                                        Usuarios
                                                    </Link>
                                                </li>

                                                <li className="mt-3">
                                                    <Link
                                                        to="/dashboard/UsuariosLogs"
                                                        className="w-full text-left px-3 py-2 text-sm text-gray-600 rounded-md hover:bg-[#e7000b]/10 hover:text-[#e7000b] transition-colors"
                                                        onClick={() => handleNavigation("users", "logs")}
                                                    >
                                                        Logs Usuarios
                                                    </Link>
                                                </li>


                                            </ul>

                                        )}
                                    </div>
                                </li>


                            </ul>
                        </nav>
                    </div>

                    {/* Logout */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <button
                            className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-[#e7000b]/10 transition-colors duration-150 rounded-md focus:outline-none focus:ring-2 "
                            onClick={handleLogout}
                            aria-label="Cerrar sesión"
                        >
                            <LogOut className="w-5 h-5 mr-2" aria-hidden="true" />
                            Cerrar Sesión
                        </button>
                    </div>

                </aside>

                {/* Main Content */}
                <div className="flex flex-1 flex-col overflow-hidden">
                    {/* Top Bar */}
                    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
                        <div className="flex items-center">
                            <button
                                className="mr-4 md:hidden p-2 rounded-lg hover:bg-[#e7000b]/10 transition-colors"
                                onClick={toggleSidebar}
                            >
                                <Menu className="h-5 w-5 text-gray-600" />
                            </button>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 bg-[#e7000b] rounded-full"></div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {activeSection === "dashboard" ? "Dashboard" :
                                        activeSection === "now-playing" ? "Películas en Cartelera" :
                                            activeSection === "upcoming" ? "Próximos Estrenos" :
                                                activeSection === "genres" ? "Géneros" :
                                                    activeSection === "showtimes" ? "Horarios" :
                                                        activeSection === "theaters" ? "Salas" :
                                                            activeSection === "users" ? "Usuarios" :
                                                                activeSection === "stats" ? "Estadísticas" :
                                                                    activeSection === "settings" ? "Configuración" : "CineDash"}
                                </h2>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div
                                    className="flex items-center cursor-pointer"
                                    onClick={() => setShowProfileModal(true)}
                                >
                                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                        <img src={FotoPerfil} alt="Avatar" className="h-full w-full object-cover" />
                                    </div>
                                    <div className="ml-2 flex flex-col text-xs">
                                        <span> {fullName} </span>
                                        <span className="opacity-70"> {roles} </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </header>

                    {/* Content Area */}
                    <main className="flex-1 overflow-y-auto bg-gray-50">
                        <div className="p-4">
                            {children}
                        </div>
                    </main>

                </div>
            </div>

            {showProfileModal && <ModalUser setShowProfileModal={handleModalUser} />}


        </>
    );
};



