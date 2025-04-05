

import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from '../Pages'
import { Main } from "../Pages";

export const UserRoute = () => {
    return (
        <Routes>
            <Route path="/*" element={<Layout />}>
                <Route index element={<Main />} />
                <Route path="about" element={<h1>About</h1>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    )
}
