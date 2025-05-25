import { useEffect, useRef, useState } from 'react';
import * as Chart from 'chart.js';

import useAuthStore from '../../Store/authStore';
import { GetGeneralStatistics, GetMostPopularMovies, GetSellByMonth, IncomesByAuditorium } from '../Helpers';


const {
  Chart: ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineController,
  DoughnutController,
  BarController,
  Filler
} = Chart;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineController,
  DoughnutController,
  BarController
);

export const Estadisticas = () => {

  const token = useAuthStore((state) => state.token);

  const ventasPorMesRef = useRef(null);
  const peliculasPopularesRef = useRef(null);
  const ventasPorSalaRef = useRef(null);
  const funcionesPorHoraRef = useRef(null);

  const [GeneralStadisti, setGeneralStadisti] = useState([]);
  const [ventasPorMes, setVentasPorMes] = useState({});
  const [peliculasPopulares, setPeliculasPopulares] = useState({});
  const [ventasPorSala, setVentasPorSala] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const fecthGeneralStatistics = async () => {
    setIsLoading(true);
    try {
      const response = await GetGeneralStatistics(token);

      const { ventasTotales, entradasVendidas, peliculasActivas } = response;

      const estadisticasResumen = [
        { titulo: 'Ventas Totales', valor: parseFloat(ventasTotales).toFixed(2) },
        { titulo: 'Entradas Vendidas', valor: entradasVendidas },
        { titulo: 'Películas Activas', valor: peliculasActivas },
      ];

      const responseSell  = await GetSellByMonth(token);
      const PopularMovies = await GetMostPopularMovies(token);
      const IncomesMovies = await IncomesByAuditorium(token);

      setVentasPorMes(responseSell);
      setGeneralStadisti(estadisticasResumen);
      setPeliculasPopulares(PopularMovies);
      setVentasPorSala(IncomesMovies);

    } catch (error) {
      console.error('Error loading statistics:', error);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    fecthGeneralStatistics();
  }, []);

  // Datos ficticios - reemplazar con datos reales de tu BD
  const datosVentasPorMes = {
    labels: ventasPorMes.labels,
    datasets: [{
      label: 'Ventas ($)',
      data: ventasPorMes.data,
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: false
    }]
  };

  const datosPeliculasPopulares = {
    labels: peliculasPopulares.labels, 
    datasets: [{
      label: 'Entradas Vendidas',
      data: peliculasPopulares.data,
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(245, 158, 11, 0.8)'
      ],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  const datosVentasPorSala = {
    labels:  ventasPorSala.labels,
    datasets: [{
      label: 'Ingresos por Sala ($)',
      data: ventasPorSala.data,
      backgroundColor: 'rgba(34, 197, 94, 0.8)',
      borderColor: 'rgba(34, 197, 94, 1)',
      borderWidth: 2
    }]
  };

  const datosFuncionesPorHora = {
    labels: ['14:00', '16:30', '19:00', '21:30', '00:00'],
    datasets: [{
      label: 'Ocupación Promedio (%)',
      data: [45, 65, 85, 90, 60],
      backgroundColor: 'rgba(168, 85, 247, 0.8)',
      borderColor: 'rgba(168, 85, 247, 1)',
      borderWidth: 2
    }]
  };

  const configuracionLinea = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Ventas Mensuales' }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  const configuracionDoughnut = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'Películas Más Populares' }
    }
  };

  const configuracionBar = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Ingresos por Sala' }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  // const configuracionBarHorizontal = {
  //   responsive: true,
  //   maintainAspectRatio: true,
  //   indexAxis: 'y',
  //   plugins: {
  //     legend: { position: 'top' },
  //     title: { display: true, text: 'Ocupación por Horario' }
  //   },
  //   scales: {
  //     x: { beginAtZero: true, max: 100 }
  //   }
  // };

  useEffect(() => {
    if (!isLoading && ventasPorMesRef.current) {
      const ctxVentas = ventasPorMesRef.current.getContext('2d');
      const chartVentas = new ChartJS(ctxVentas, {
        type: 'line',
        data: datosVentasPorMes,
        options: configuracionLinea
      });

      const ctxPeliculas = peliculasPopularesRef.current.getContext('2d');
      const chartPeliculas = new ChartJS(ctxPeliculas, {
        type: 'doughnut',
        data: datosPeliculasPopulares,
        options: configuracionDoughnut
      });

      const ctxSalas = ventasPorSalaRef.current.getContext('2d');
      const chartSalas = new ChartJS(ctxSalas, {
        type: 'bar',
        data: datosVentasPorSala,
        options: configuracionBar
      });

      // const ctxFunciones = funcionesPorHoraRef.current.getContext('2d');
      // const chartFunciones = new ChartJS(ctxFunciones, {
      //   type: 'bar',
      //   data: datosFuncionesPorHora,
      //   options: configuracionBarHorizontal
      // });

      // Prevenir comportamiento táctil no deseado
      const canvases = [ventasPorMesRef, peliculasPopularesRef, ventasPorSalaRef];
      canvases.forEach((canvasRef) => {
        if (canvasRef.current) {
          canvasRef.current.addEventListener('touchstart', (e) => {
            e.preventDefault();
          });
        }
      });

      return () => {
        chartVentas.destroy();
        chartPeliculas.destroy();
        chartSalas.destroy();
        // chartFunciones.destroy();
      };
    }
  }, [isLoading]);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-red mx-auto"></div>
          <p className="mt-6 text-xl text-gray-600 font-medium">Cargando estadísticas...</p>
          <p className="mt-2 text-sm text-gray-500">Por favor espere un momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Estadísticas</h1>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {GeneralStadisti.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.titulo}</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">{stat.valor}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Ventas por mes */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full h-96">
          <canvas ref={ventasPorMesRef}></canvas>
        </div>

        {/* Películas populares */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full h-96">
          <canvas ref={peliculasPopularesRef}></canvas>
        </div>
      </div>

      {/* Gráficos secundarios */}
      <div className="grid grid-cols-1 lg:grid-cols-1">
        <div className="bg-white p-6 rounded-lg shadow-md w-full h-96 grid place-items-center">
          <canvas ref={ventasPorSalaRef} className="max-w-full max-h-full" />
        </div>
      </div>


    </div>
  );
};