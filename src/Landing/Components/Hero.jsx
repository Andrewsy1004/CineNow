

import { Star } from "lucide-react";
import { Typewriter } from 'react-simple-typewriter';

import { Features, MoreInformation, PopularMovies, FAQSection } from "./index";

export const Hero = () => {

    return (
        <main>
            <section className="bg-gradient-to-r from-[#E40808] to-red-700 text-white py-24 px-4"  >
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Bienvenido a CineNow</h1>

                    <p className="text-lg md:text-xl mb-8">
                        Vive la magia del cine como nunca antes, con salas de última generación diseñadas para ofrecerte una experiencia única.
                        <span className="block mt-4 font-bold text-white text-2xl">
                            <Typewriter
                                words={['Rápido', 'Accesible', 'Fácil']}
                                loop={true}
                                cursor
                                cursorStyle="_"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </span>
                    </p>

                    <a
                        href="#cartera"
                        className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-md inline-block"
                    >
                        Ver cartelera
                    </a>

                </div>
            </section>

            {/* Popular Movies */}
            <PopularMovies />

            {/* Features */}
            <Features />
            
            {/* FAQ */}
            <FAQSection />

            {/* More Information */}
            <MoreInformation />


        </main>

    )
}
