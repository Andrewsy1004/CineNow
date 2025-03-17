

export const Footer = () => {
    return (

        <footer className="bg-terciary text-white py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-2">CineNow</h3>
                        <p className="text-gray-400">
                            Atrévete a vivir una experiencia cinematográfica como nunca antes
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Producto</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Características
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Precios
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Compañía</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Sobre Nosotros
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Carreras
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Contacto
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Política de Privacidad
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Términos de Servicio
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                    &copy; 2025 CineNow. Todos los derechos reservados.
                </div>
            </div>
        </footer>

    )
}
