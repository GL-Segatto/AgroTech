import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import api from "../../services/api";

function Safras() {

    const [safras, setSafras] = useState([]);

    const [nome, setNome] = useState("");
    const [cultura, setCultura] = useState("");
    const [area, setArea] = useState("");

    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {

        carregarSafras();

    }, []);

    async function carregarSafras() {

        try {

            const resposta = await api.get("/Safras");

            setSafras(resposta.data);

        }

        catch (erro) {

            console.error("Erro ao carregar safras:", erro);

        }

    }

    async function salvarSafra(e) {

        e.preventDefault();

        if (!nome || !cultura || !area) {

            alert("Preencha todos os campos.");

            return;

        }

        try {

            if (editandoId !== null) {

                await api.put(`/Safras/${editandoId}`, {

                    id: editandoId,
                    nome,
                    cultura,
                    area: Number(area)

                });

            }

            else {

                await api.post("/Safras", {

                    nome,
                    cultura,
                    area: Number(area)

                });

            }

            await carregarSafras();

            limparFormulario();

        }

        catch (erro) {

            console.error("Erro ao salvar safra:", erro);

        }

    }

    function editarSafra(safra) {

        setNome(safra.nome);
        setCultura(safra.cultura);
        setArea(safra.area);

        setEditandoId(safra.id);

    }

    async function excluirSafra(id) {

        if (!confirm("Deseja realmente excluir esta safra?")) {

            return;

        }

        try {

            await api.delete(`/Safras/${id}`);

            carregarSafras();

        }

        catch (erro) {

            console.error("Erro ao excluir safra:", erro);

        }

    }

    function limparFormulario() {

        setNome("");
        setCultura("");
        setArea("");

        setEditandoId(null);

    }

    return (

        <>

            <h1>Safras</h1>

            <form onSubmit={salvarSafra}>

                <FormInput
                    label="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <FormInput
                    label="Cultura"
                    value={cultura}
                    onChange={(e) => setCultura(e.target.value)}
                />

                <FormInput
                    label="Área (ha)"
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                />

                <Button type="submit">

                    {

                        editandoId !== null

                            ? "Salvar Alterações"

                            : "Cadastrar Safra"

                    }

                </Button>

                {

                    editandoId !== null &&

                    <Button
                        type="button"
                        onClick={limparFormulario}
                    >
                        Cancelar
                    </Button>

                }

            </form>

            <hr />

            <table border="1" cellPadding="10">

                <thead>

                    <tr>

                        <th>Nome</th>
                        <th>Cultura</th>
                        <th>Área</th>
                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        safras.map((safra) => (

                            <tr key={safra.id}>

                                <td>{safra.nome}</td>

                                <td>{safra.cultura}</td>

                                <td>{safra.area} ha</td>

                                <td>

                                    <Button
                                        type="button"
                                        onClick={() => editarSafra(safra)}
                                    >
                                        Editar
                                    </Button>

                                    {" "}

                                    <Button
                                        type="button"
                                        onClick={() => excluirSafra(safra.id)}
                                    >
                                        Excluir
                                    </Button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </>

    );

}

export default Safras;
