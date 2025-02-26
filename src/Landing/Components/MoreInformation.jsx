

import { useState } from "react";

import toast from 'react-hot-toast'
import { Mail } from "lucide-react";


export const MoreInformation = () => {

    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email.trim() === '' || !email.includes('@')) {
            toast.error('Por favor ingresa un correo valido')
            return
        }

        toast.success('Gracias por suscribirte!, te enviaremos las ultimas novedades')
        setEmail('')

    }

    return (
        <section className="py-16 px-4 ">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Suscríbete para recibir las últimas novedades</h2>
                <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-1">

                    <div className="relative flex-grow">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition duration-200"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-label="Correo electrónico"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto transition duration-300 px-8 py-2 rounded-md"
                        onClick={handleSubmit}
                    >
                        Suscribirse
                    </button>
                </form>
            </div>
        </section>
    )
}
