

import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/";
import { Footer } from "../../Landing/Components";


export const Layout = () => {
    return (
        <div>
            <Navbar />
            <main className="p-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
