import { useState } from "react";
import { useData } from "../../context/DataContext";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";

function Safras() {

    const [nome, setNome] = useState("");
    const [cultura, setCultura] = useState("");
    const [area, setArea] = useState("");

    const [editandoId, setEditandoId] = useState(null);

    const {
      safras,
      setSafras
    } = useData();

    function adicionarSafra(e) {

        e.preventDefault();

        if (!nome || !cultura || !area) {
            alert("Preencha todos os campos.");
            return;
        }

        if (editandoId !== null) {

            const novasSafras = safras.map((safra) => {

                if (safra.id === editandoId) {

                    return {
                        ...safra,
                        nome,
                        cultura,
                        area
                    };

                }

                return safra;

            });

            setSafras(novasSafras);

            setEditandoId(null);

        } else {

            const novaSafra = {

                id: Date.now(),
                nome,
                cultura,
                area

            };

            setSafras([...safras, novaSafra]);

        }

        setNome("");
        setCultura("");
        setArea("");

    }

    function excluirSafra(id) {

        setSafras(

            safras.filter((safra) => safra.id !== id)

        );

    }

    function editarSafra(safra) {

        setNome(safra.nome);
        setCultura(safra.cultura);
        setArea(safra.area);

        setEditandoId(safra.id);

    }

    return (

        <Layout>

            <h1>Gestão de Safras</h1>

            <form onSubmit={adicionarSafra}>

                <FormInput
                    label="Nome da Safra"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex.: Safra Verão 2026"
                />

                <FormInput
                    label="Cultura"
                    value={cultura}
                    onChange={(e) => setCultura(e.target.value)}
                    placeholder="Milho, Soja..."
                />

                <FormInput
                    label="Área (ha)"
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="50"
                />

                <Button type="submit">

                    {editandoId !== null
                        ? "Salvar Alterações"
                        : "Cadastrar Safra"}

                </Button>

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
                                        onClick={() => editarSafra(safra)}
                                    >
                                        Editar
                                    </Button>

                                    {" "}

                                    <Button
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

        </Layout>

    );

}

export default Safras;
