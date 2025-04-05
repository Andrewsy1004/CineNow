

import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import { RegistrarUsuario } from "../helpers";


export const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
    nombre: '',
    apellido: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    const { correo, contrasena, nombre, apellido } = formData
    
    if( nombre.trim() === '' ) toast.error('Por favor ingresa tu nombre')
    if( apellido.trim() === '' ) toast.error('Por favor ingresa tu apellido')
         
    if( correo.trim() === '' || !correo.includes('@') ){
      toast.error('Por favor ingresa un correo valido, que sea un correo de gmail')
      return
    }

    if (contrasena.trim() === '') {
      toast.error('Por favor ingresa una contraseña')
      return
    }
    
    const regex = /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (!regex.test(contrasena)) {
      toast.error('La contraseña debe tener al menos una mayúscula, una minúscula y un número o carácter especial, sin puntos ni saltos de línea');
      return false;
    }
   
    const response = await RegistrarUsuario( nombre, apellido, correo, contrasena )

    if( response.status ){
      toast.success(response.message)
    }else{
      toast.error(response.message)
    }

  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="w-full max-w-md mx-auto ">
            <div className="flex justify-center">
              <img
                className="h-14 w-auto hover:scale-105 transition-transform duration-200"
                src="/favicon.svg"
                alt="Logo de la empresa"
                loading="eager"
              />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Crear cuenta
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Registrate con tus datos personales
              </p>
            </div>
          </div>

          <form className="space-y-6 mt-3" onSubmit={handleSubmit}> 
            <div>
              <label htmlFor="Nombre" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <div className="mt-1">
                <input
                  id="Nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
                Apellido
              </label>
              <div className="mt-1">
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="correo"
                  type="email"
                  autoComplete="email"
                  value={formData.correo}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="Contraseña" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <input
                  id="Contraseña"
                  name="contrasena"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.contrasena}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>



            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                 bg-primary-red hover:bg-red-700 focus:outline-none"
              >
                Registrarse
              </button>
            </div>

          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  ¿Ya tienes una cuenta?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50
                 focus:outline-none"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
