
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '../../User'
import { Movies } from '../../User/Components'
import { Tickets } from '../../User/Components'

export const CashierRoute = () => {
  return (
    <Routes>
      <Route path="/*" element={<Layout /> }>
        
        <Route index element={ <Movies /> } />
        <Route path="*" element={<Navigate to="/" replace />} />

        <Route path="tickets" element={<Tickets /> } />


      </Route>
    </Routes>
  )
}
