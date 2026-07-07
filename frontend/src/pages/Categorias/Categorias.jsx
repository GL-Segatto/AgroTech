import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import api from "../../services/api";

function Categorias() {

    const [categorias, setCategorias] = useState([]);

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");

    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {

        carregarCategorias();

    }, []);

    async function carregarCategorias() {

        try {

            const resposta = await api.get("/Categorias");

            setCategorias(resposta.data);

        }

        catch (erro) {

            console.error("Erro ao carregar categorias:", erro);

        }

    }

    async function salvarCategoria(e) {

        e.preventDefault();

        if (!nome || !descricao) {

            alert("Preencha todos os campos.");

            return;

        }

        try {

            if (editandoId !== null) {

                await api.put(`/Categorias/${editandoId}`, {

                    id: editandoId,
                    nome,
                    descricao

                });

            }

            else {

                await api.post("/Categorias", {

                    nome,
                    descricao

                });

            }

            await carregarCategorias();

            limparFormulario();

        }

        catch (erro) {

            console.error("Erro ao salvar categoria:", erro);

        }

    }

    function editarCategoria(categoria) {

        setNome(categoria.nome);
        setDescricao(categoria.descricao);

        setEditandoId(categoria.id);

    }

    async function excluirCategoria(id) {

        if (!confirm("Deseja realmente excluir esta categoria?")) {

            return;

        }

        try {

            await api.delete(`/Categorias/${id}`);

            carregarCategorias();

        }

        catch (erro) {

            console.error("Erro ao excluir categoria:", erro);

        }

    }

    function limparFormulario() {

        setNome("");
        setDescricao("");

        setEditandoId(null);

    }

    return (

        <>

            <h1>Categorias</h1>

            <form onSubmit={salvarCategoria}>

                <FormInput
                    label="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <FormInput
                    label="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <Button type="submit">

                    {

                        editandoId !== null

                            ? "Salvar Alterações"

                            : "Cadastrar Categoria"

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
                        <th>Descrição</th>
                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        categorias.map((categoria) => (

                            <tr key={categoria.id}>

                                <td>{categoria.nome}</td>

                                <td>{categoria.descricao}</td>

                                <td>

                                    <Button
                                        type="button"
                                        onClick={() => editarCategoria(categoria)}
                                    >
                                        Editar
                                    </Button>

                                    {" "}

                                    <Button
                                        type="button"
                                        onClick={() => excluirCategoria(categoria.id)}
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

export default Categorias;
