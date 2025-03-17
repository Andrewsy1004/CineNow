

import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react'
import toast from "react-hot-toast";


export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { email, password } = formData

    if( email.trim() === '' || !email.includes('@') || password.trim() === '' ){
      toast.error('Por favor ingresa un correo valido y una contraseña')
      return
    }

    if (email.trim() === '' || !email.includes('@')) {
      toast.error('Por favor ingresa un correo valido')
      return
    }

    if (password.trim() === '') {
      toast.error('Por favor ingresa una contraseña')
      return
    }
    
  }
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
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
                Inicia sesión
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Bienvenido de nuevo, ingresa tus credenciales
              </p>
            </div>
          </div>
          
          
          <form className="space-y-6 mt-3" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                   placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-primary-red focus:border-primary-red sm:text-sm"
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
                Iniciar sesión
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
                  ¿No tienes una cuenta?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/registrar"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none "
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
