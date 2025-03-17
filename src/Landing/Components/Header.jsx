

import { useState } from "react";
import { Link } from "react-router-dom";

import { Menu, X } from "lucide-react";

export const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <header className="bg-primary-red shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">

        <div className="text-2xl font-bold text-white">CineNow</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <a href="#cartera" className="text-white hover:text-red-200 transition">
            Cartelera
          </a>
          <a href="#sobreNosotros" className="text-white hover:text-red-200 transition">
            Sobre nosotros
          </a>
          <a href="#preguntasComunes" className="text-white hover:text-red-200 transition">
            Preguntas Comunes
          </a>
        </div>

        {/* Desktop Login Button */}
        <Link to="/login" className="hidden md:flex text-primary-red bg-white py-2 px-4 rounded-lg hover:bg-gray-100 transition">
          Iniciar Sesión
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-red absolute top-12 right-0 w-full shadow-lg">
          <a
            href="#cartera"
            className="block px-4 py-2 text-white hover:bg-red-600 transition"
          >
            Cartelera
          </a>
          <a
            href="#sobreNosotros"
            className="block px-4 py-2 text-white hover:bg-red-600 transition"
          >
            Sobre nosotros

          </a>
          <a
            href="#preguntasComunes"
            className="block px-4 py-2 text-white hover:bg-red-600 transition"
          >
            Preguntas Comunes
          </a>

          <Link to="/login" className="block w-full px-4 py-2 text-white hover:bg-red-700 transition font-bold">
            Iniciar Sesión
          </Link>

        </div>
      )}
    </header>
  );
};