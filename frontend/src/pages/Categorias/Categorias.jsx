import { useState } from "react";
import { useData } from "../../context/DataContext";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";

function Categorias() {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");

    const [editandoId, setEditandoId] = useState(null);

    const {
      categorias,
      setCategorias
    } = useData();

    function salvarCategoria(e) {

        e.preventDefault();

        if (!nome || !descricao) {
            alert("Preencha todos os campos.");
            return;
        }

        if (editandoId !== null) {

            setCategorias(

                categorias.map(categoria =>

                    categoria.id === editandoId
                        ? {
                            ...categoria,
                            nome,
                            descricao
                        }
                        : categoria

                )

            );

            setEditandoId(null);

        } else {

            const novaCategoria = {

                id: Date.now(),
                nome,
                descricao

            };

            setCategorias([...categorias, novaCategoria]);

        }

        setNome("");
        setDescricao("");

    }

    function editarCategoria(categoria) {

        setNome(categoria.nome);
        setDescricao(categoria.descricao);

        setEditandoId(categoria.id);

    }

    function excluirCategoria(id) {

        setCategorias(

            categorias.filter(categoria => categoria.id !== id)

        );

    }

    return (

        <Layout>

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

                        categorias.map(categoria => (

                            <tr key={categoria.id}>

                                <td>{categoria.nome}</td>

                                <td>{categoria.descricao}</td>

                                <td>

                                    <Button
                                        onClick={() => editarCategoria(categoria)}
                                    >
                                        Editar
                                    </Button>

                                    {" "}

                                    <Button
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

        </Layout>

    );

}

export default Categorias;
