import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Usuarios from "../pages/Usuarios/Usuarios";
import Safras from "../pages/Safras/Safras";
import Lancamentos from "../pages/Lancamentos/Lancamentos";
import Categorias from "../pages/Categorias/Categorias";
import Perfil from "../pages/Perfil/Perfil";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/usuarios"
                    element={
                        <ProtectedRoute>
                            <Usuarios />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/safras"
                    element={
                        <ProtectedRoute>
                            <Safras />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/categorias"
                    element={
                        <ProtectedRoute>
                            <Categorias />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/lancamentos"
                    element={
                        <ProtectedRoute>
                            <Lancamentos />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/perfil"
                    element={
                        <ProtectedRoute>
                            <Perfil />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
