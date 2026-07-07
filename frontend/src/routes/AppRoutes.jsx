import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Usuarios from "../pages/Usuarios/Usuarios";
import Safras from "../pages/Safras/Safras";
import Lancamentos from "../pages/Lancamentos/Lancamentos";
import Categorias from "../pages/Categorias/Categorias";
import Perfil from "../pages/Perfil/Perfil";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Layout from "../layout/Layout";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* LOGIN FORA DO LAYOUT */}
                <Route path="/" element={<Login />} />

                {/* ROTAS PROTEGIDAS COM LAYOUT */}
                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="/safras" element={<Safras />} />
                    <Route path="/categorias" element={<Categorias />} />
                    <Route path="/lancamentos" element={<Lancamentos />} />
                    <Route path="/perfil" element={<Perfil />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
