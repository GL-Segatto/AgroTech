import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Usuarios from "../pages/Usuarios/Usuarios";
import Safras from "../pages/Safras/Safras";
import Lancamentos from "../pages/Lancamentos/Lancamentos";
import Categorias from "../pages/Categorias/Categorias";
import Perfil from "../pages/Perfil/Perfil";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/safras" element={<Safras />} />
                <Route path="/lancamentos" element={<Lancamentos />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/perfil" element={<Perfil />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
