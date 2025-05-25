

import { Routes, Route, Navigate } from 'react-router-dom';

import { Estadisticas, Peliculas, UserLogs, UsersProfile } from "../Components"
import { DashboardAdmin } from "../Components/DashboardAdmin"

export const DashboardRouter = () => {
  return (
    <DashboardAdmin>
      <Routes>

        <Route path="/dashboard" element={<Estadisticas />} />

        <Route path="/dashboard/Usuarios" element={<UsersProfile />} />
        <Route path="/dashboard/UsuariosLogs" element={<UserLogs />} />

        <Route path="/dashboard/Peliculas" element={ <Peliculas /> } />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
       
      </Routes>
    </DashboardAdmin>
  )
}