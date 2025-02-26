

import { Routes, Route } from "react-router-dom"

import { Login, Register } from "../../Auth"
import { LandingPage } from "../Pages"

export const LandingRoute = () => {
    return (
        <Routes>
            <Route>
                <Route path="/" element={<LandingPage /> } />
                <Route path="/login" element={<Login /> } />
                <Route path="/registrar" element={<Register /> } />
            </Route>
        </Routes>
    )
}
