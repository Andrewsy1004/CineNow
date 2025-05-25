
import { useState, useMemo, useEffect } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight, FileDown } from "lucide-react";

import { pdf } from "@react-pdf/renderer";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";

import toast from "react-hot-toast"
import { PdfDocumentEstadisticas } from "../../Pdf";

import useAuthStore from '../../Store/authStore';
import { GetBillUser } from "../Helpers/Movies";




export const Estadisticas = () => {
  const [isClient, setIsClient] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);

  const [datosCompras, setDatosCompras] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalDinero = datosCompras
    .reduce((total, compra) => total + parseFloat(compra.Total), 0)
    .toFixed(2); const token = useAuthStore((state) => state.token);

  const UserTicket = async () => {
    try {
      setIsLoading(true);
      const response = await GetBillUser(token);
      if (response.status) {
        setDatosCompras(response.data.bills);
      } else {
        toast.error("Error al obtener los tickets");
      }
    } catch (error) {
      toast.error("Error al obtener los tickets");
    } finally {
      setIsLoading(false);
    }
  };

  // Llamar a la función para obtener los tickets al cargar el componente
  useEffect(() => {
    UserTicket();
  }, [token]);


  useEffect(() => {
    setIsClient(true);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "ID",
        header: "ID",
        cell: info => <span className="font-medium">{info.getValue()}</span>,
      },
      {
        accessorKey: "Película",
        header: "Película",
      },
      {
        accessorKey: "Entradas",
        header: "Entradas",
        cell: info => (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "Fecha",
        header: "Fecha",
      },
      {
        accessorKey: "Total",
        header: "Total",
        cell: info => (
          <span className="font-medium text-green-600">
            ${info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "Sala",
        header: "Sala",
      },
    ],
    []
  );

  const table = useReactTable({
    data: datosCompras,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 3,
      },
    },
  });

  // Función para generar y descargar el PDF
  const generatePdf = async () => {
    try {
      setLoadingPdf(true);
      
      const blob = await pdf(
        <PdfDocumentEstadisticas data={datosCompras} totalDinero={totalDinero} />
      ).toBlob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = "historial-compras.pdf";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setLoadingPdf(false);

      toast.success("PDF generado y descargado con éxito!");

    } catch (error) {
      console.error("Error generando PDF:", error);
      setLoadingPdf(false);
      toast.error("Error generando PDF. Intenta nuevamente.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto mb-48">
      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingCart className="h-6 w-6 text-primary-red mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Historial de Compras</h2>
          </div>
          <div className="flex items-center">
            <button
              onClick={generatePdf}
              disabled={loadingPdf || isLoading}
              className="flex items-center px-4 py-2 bg-primary-red text-white rounded-md transition-colors disabled:opacity-50"
            >
              {loadingPdf ? (
                "Generando PDF..."
              ) : (
                <>
                  <FileDown className="h-5 w-5 mr-2" />
                  Descargar PDF
                </>
              )}
            </button>
          </div>
        </div>
        <p className="text-gray-500 mt-1">Revisa todas tus compras de entradas</p>
      </div>

      {/* Loader */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-red"></div>
        </div>
      ) : datosCompras.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No hay compras disponibles.</p>
      ) : (
        <>
          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>

            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div className="text-sm text-gray-700">
                Página{" "}
                <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span>{" "}
                de <span className="font-medium">{table.getPageCount()}</span>
              </div>

              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {Array.from(Array(table.getPageCount()).keys()).map((pageIdx) => (
                    <button
                      key={pageIdx}
                      onClick={() => table.setPageIndex(pageIdx)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                        ${table.getState().pagination.pageIndex === pageIdx
                          ? "z-10 bg-purple-50 border-primary-red text-primary-red"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"}`}
                    >
                      {pageIdx + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Total de dinero */}
          <div className="mt-6 text-lg font-semibold text-gray-800">
            Total de dinero: ${totalDinero}
          </div>
        </>
      )}
    </div>
  );
}