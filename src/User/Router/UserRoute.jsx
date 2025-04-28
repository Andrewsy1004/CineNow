

import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from '../Pages'
import { Main, MoviePage } from "../Pages";
import { Entradas, Estadisticas, Tickets } from "../Components";

export const UserRoute = () => {
    return (
        <Routes>
            <Route path="/*" element={<Layout />}>
                <Route index element={<Main />} />
                <Route path="mis-entradas" element={<Entradas />} />
                <Route path="estadisticas" element={<Estadisticas />} />
                <Route path="tickets" element={<Tickets />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    )
}
