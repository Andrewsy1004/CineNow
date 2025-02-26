
import { Calendar, MapPin, Clock } from "lucide-react";


const features = [
    {
      icon: Calendar,
      title: "Reserva fácil",
      description: "Reserva tus entradas en línea con solo unos clics",
    },
    {
      icon: MapPin,
      title: "Ubicaciones convenientes",
      description: "Cines en las mejores ubicaciones de la ciudad",
    },
    {
      icon: Clock,
      title: "Horarios flexibles",
      description: "Múltiples funciones para adaptarse a tu agenda",
    },
  ];

export const Features = () => {
    return (
        <section className="bg-white py-16 px-4" id="sobreNosotros">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">¿Por qué elegir CineNow?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {
                        features.map((feature, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg">
                                <feature.icon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))
                    } 
                </div>
            </div>
        </section>

    )
}
