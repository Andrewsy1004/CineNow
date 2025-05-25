

import { useState } from "react";

import { X, Calendar, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { getSeats } from "../../User/Helpers";

export const BookMovie = ({ selectedMovie, onClose, infoUser, setAsientosOcupado, setModalAsientos, setInfoHorario }) => {
    

    const roles = infoUser.roles;
    const token = infoUser.token;
    const id = selectedMovie.id;

    const precio = roles.includes("VipUsuario") ? 6.9 : 8.9;

    const [asientosOcupados, setAsientosOcupados] = useState([]);
    const [formData, setFormData] = useState({
        fecha: "",
        horario: "",
        nentradas: "",
    });

    const horariosDisponibles = [
        { id: 1, label: "10:00 - 12:00", inicio: 10, fin: 12 },
        { id: 2, label: "13:00 - 15:00", inicio: 13, fin: 15 },
        { id: 3, label: "17:00 - 19:00", inicio: 17, fin: 19 },
        { id: 4, label: "20:00 - 22:00", inicio: 20, fin: 22 }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const getFechaMinima = () => {
        const hoy = new Date();
        return hoy.toISOString().split('T')[0];
    };

    const comprarEntradas = async () => {

        // cambiar el id del horario
        const { fecha, nentradas } = formData;

        const selectedHorario = horariosDisponibles.find(h => h.id == formData.horario);

        const horario = selectedHorario.label;

        // cambiar el id del horario

        if (!fecha || !horario) {
            toast.error("Por favor, selecciona una fecha y un horario.");
            return;
        }

        if (nentradas < 1) {
            toast.error("La cantidad de entradas debe ser al menos 1.");
            return;
        }


        const fechaSeleccionada = new Date(fecha);
        const diaSemana = fechaSeleccionada.getDay();

        const ahora = new Date();
        const horas = ahora.getHours().toString().padStart(2, '0');
        const minutos = ahora.getMinutes().toString().padStart(2, '0');


        if (diaSemana == 6) {
            toast.error("No se pueden comprar entradas para el domingo");
            return;
        }

        const fechaActual = new Date().toISOString().split('T')[0];

        if (fecha === fechaActual) {
            // Validar que la hora selecionada sea mayor a la actual        
            const InicioHorario = horario.split(" - ")[0].split(":").join("");
            const FinHorario = horario.split(" - ")[1].split(":").join("");

            if (InicioHorario <= horas) {
                toast.error("No se pueden comprar entradas para horarios pasados !! ");
                return;
            }
        }

        const hora_inicio = horario.split("-")[0].trim();
        const hora_final = horario.split("-")[1].trim();

        const dataBooking = {
            fecha: (fecha),
            hora_inicio: (hora_inicio),
            hora_final: (hora_final),
            peliculaId: (id),
        };


        // Traer los asientos que ya la pelicula tiene ocupados
        const response = await getSeats(token, dataBooking);

        if (response.msg == "asientos disponibles") {
            setAsientosOcupados(response.asientos);
        } else {
            setAsientosOcupados([]);
        }

        setAsientosOcupado(response.asientos);
        setInfoHorario({
            fecha:     formData.fecha,
            horario:   horario,
            nentradas: formData.nentradas, 
        });

        setModalAsientos(true);

        setFormData({
            fecha: "",
            horario: "",
            nentradas: "",
        });

        toast.success("Entradas compradas correctamente");
        onClose();

    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        Reserva de Película: {selectedMovie.titulo}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={20} className=" hover:text-primary-red " />
                    </button>
                </div>


                <div>
                    <label className="block text-gray-500 font-medium mb-1">
                        Fecha:
                    </label>
                    <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="date"
                            min={getFechaMinima()}
                            value={formData.fecha || ""}
                            onChange={handleChange}
                            name="fecha"
                            className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-500 font-medium mb-1 mt-3">
                        Horario:
                    </label>
                    <select
                        value={formData.horario || ""}
                        onChange={handleChange}
                        name="horario"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                    >
                        <option value="">Seleccionar horario</option>
                        {horariosDisponibles.map(h => (
                            <option key={h.id} value={h.id}>
                                {h.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-500 font-medium mb-1 mt-3">
                        Nº de entradas:
                    </label>
                    <input
                        name="nentradas"
                        type="number"
                        min={1}
                        max={10}
                        value={formData.nentradas || 1}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                    />
                </div>


                <div className="bg-gray-50 p-1 rounded-lg text-center mt-3">
                    <p className="text-gray-500 text-sm">Precio total</p>
                    <p className="text-2xl font-bold text-red-600">
                        {((formData.nentradas || 1) * precio).toFixed(2)} COD
                    </p>
                    <p className="text-xs text-gray-400">
                        {roles.includes("VipUsuario") ? "Precio con descuento VIP" : "Precio estándar"}
                    </p>
                </div>

                <button
                    onClick={comprarEntradas}
                    className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg flex items-center justify-center font-medium transition-all duration-300"
                >
                    <ShoppingCart size={18} className="mr-2" />
                    Comprar Entradas
                </button>


            </div>



        </div>
    )


}


