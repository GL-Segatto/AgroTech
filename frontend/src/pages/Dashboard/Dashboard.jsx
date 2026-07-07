import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import api from "../../services/api";

function Dashboard() {

    const [usuarios, setUsuarios] = useState([]);
    const [safras, setSafras] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [lancamentos, setLancamentos] = useState([]);

    useEffect(() => {

        carregarDados();

    }, []);

    async function carregarDados() {

        try {

            const [
                usuariosRes,
                safrasRes,
                categoriasRes,
                lancamentosRes
            ] = await Promise.all([

                api.get("/Usuarios"),
                api.get("/Safras"),
                api.get("/Categorias"),
                api.get("/Lancamentos")

            ]);

            setUsuarios(usuariosRes.data);
            setSafras(safrasRes.data);
            setCategorias(categoriasRes.data);
            setLancamentos(lancamentosRes.data);

        }

        catch (erro) {

            console.error("Erro ao carregar dashboard:", erro);

        }

    }

    const totalOrcado = lancamentos
        .filter(l => l.tipo === "Orçado")
        .reduce((total, l) => total + Number(l.valor), 0);

    const totalRealizado = lancamentos
        .filter(l => l.tipo === "Realizado")
        .reduce((total, l) => total + Number(l.valor), 0);

    return (

        <div>

            <h1>Dashboard</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
                    gap: "20px"
                }}
            >

                <Card>

                    <h2>Usuários</h2>

                    <h1>{usuarios.length}</h1>

                </Card>

                <Card>

                    <h2>Safras</h2>

                    <h1>{safras.length}</h1>

                </Card>

                <Card>

                    <h2>Categorias</h2>

                    <h1>{categorias.length}</h1>

                </Card>

                <Card>

                    <h2>Lançamentos</h2>

                    <h1>{lancamentos.length}</h1>

                </Card>

                <Card>

                    <h2>Total Orçado</h2>

                    <h1>R$ {totalOrcado.toFixed(2)}</h1>

                </Card>

                <Card>

                    <h2>Total Realizado</h2>

                    <h1>R$ {totalRealizado.toFixed(2)}</h1>

                </Card>

            </div>

        </div>

    );

}

export default Dashboard;
