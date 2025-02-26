

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';


export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: '¿Cómo puedo realizar una reserva?',
            answer: 'Puedes realizar una reserva a través de nuestra página web en la sección "Reservas", llamando al número de teléfono +123 456 789 o enviando un correo electrónico a reservas@ejemplo.com.'
        },
        {
            question: '¿Cuál es la política de cancelación?',
            answer: 'Las cancelaciones realizadas con 48 horas de antelación recibirán un reembolso completo. Las cancelaciones dentro de las 48 horas antes de la reserva están sujetas a un cargo del 50%. Las cancelaciones el mismo día no son reembolsables.'
        },
        {
            question: '¿Se aceptan mascotas?',
            answer: 'Sí, aceptamos mascotas amigables. Sin embargo, debe notificarnos con anticipación y puede aplicarse un cargo adicional de limpieza de 30€. Las mascotas deben mantenerse con correa en áreas comunes.'
        },
        {
            question: '¿Tienen opciones vegetarianas o veganas?',
            answer: 'Sí, ofrecemos diversas opciones vegetarianas y veganas en nuestro menú. También podemos adaptar muchos de nuestros platos para satisfacer necesidades dietéticas específicas si se nos notifica con antelación.'
        },
        {
            question: '¿Cuáles son los métodos de pago aceptados?',
            answer: 'Aceptamos todas las principales tarjetas de crédito (Visa, MasterCard, American Express), PayPal, transferencias bancarias y efectivo. Los pagos en línea se procesan a través de una pasarela segura para garantizar la protección de sus datos.'
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 px-4" id="preguntasComunes" >
            <div className="container mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Preguntas Frecuentes</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Encuentra respuestas a las preguntas más comunes. Si no encuentras lo que buscas, no dudes en contactarnos.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <button
                                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="font-medium text-gray-800">{faq.question}</span>
                                <span className="text-gray-500">
                                    {openIndex === index ?
                                        <ChevronUp className="h-5 w-5" /> :
                                        <ChevronDown className="h-5 w-5" />
                                    }
                                </span>
                            </button>

                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 py-4' : 'max-h-0'
                                    }`}
                            >
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

             

            </div>
        </section>
    );
};

