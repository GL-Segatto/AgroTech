import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

function Sidebar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/", { replace: true });
    }

    return (
        <aside className="sidebar">

            <h3 className="logo">AgroTech</h3>

            {user && (
                <p className="user">
                    Olá, {user.nome}
                </p>
            )}

            <nav className="nav">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/usuarios"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Usuários
                </NavLink>

                <NavLink
                    to="/safras"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Safras
                </NavLink>

                <NavLink
                    to="/categorias"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Categorias
                </NavLink>

                <NavLink
                    to="/lancamentos"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Lançamentos
                </NavLink>

                <NavLink
                    to="/perfil"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Perfil
                </NavLink>

            </nav>

            <button className="logout" onClick={handleLogout}>
                Sair
            </button>

        </aside>
    );
}

export default Sidebar;
