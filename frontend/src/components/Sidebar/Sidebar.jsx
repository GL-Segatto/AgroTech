import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar(){

    return(

        <aside className="sidebar">

            <Link to="/dashboard">Dashboard</Link>

            <Link to="/usuarios">Usuários</Link>

            <Link to="/safras">Safras</Link>

            <Link to="/categorias">Categorias</Link>

            <Link to="/lancamentos">Lançamentos</Link>

            <Link to="/perfil">Perfil</Link>

        </aside>

    );

}

export default Sidebar;
