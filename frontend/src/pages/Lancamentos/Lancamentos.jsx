import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import api from "../../services/api";

function Lancamentos() {

    const [lancamentos, setLancamentos] = useState([]);

    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tipo, setTipo] = useState("");
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");

    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {

        carregarLancamentos();

    }, []);

    async function carregarLancamentos() {

        try {

            const resposta = await api.get("/Lancamentos");

            setLancamentos(resposta.data);

        }

        catch (erro) {

            console.error("Erro ao carregar lançamentos:", erro);

        }

    }

    async function salvarLancamento(e) {

        e.preventDefault();

        if (!descricao || !categoria || !tipo || !valor || !data) {

            alert("Preencha todos os campos.");

            return;

        }

        try {

            const lancamento = {

                id: editandoId,
                descricao,
                categoria,
                tipo,
                valor: Number(valor),
                data

            };

            if (editandoId !== null) {

                await api.put(`/Lancamentos/${editandoId}`, lancamento);

            }

            else {

                await api.post("/Lancamentos", lancamento);

            }

            await carregarLancamentos();

            limparFormulario();

        }

        catch (erro) {

            console.error("Erro ao salvar lançamento:", erro);

        }

    }

    function editarLancamento(lancamento) {

        setDescricao(lancamento.descricao);
        setCategoria(lancamento.categoria);
        setTipo(lancamento.tipo);
        setValor(lancamento.valor);
        setData(lancamento.data.substring(0, 10));

        setEditandoId(lancamento.id);

    }

    async function excluirLancamento(id) {

        if (!confirm("Deseja realmente excluir este lançamento?")) {

            return;

        }

        try {

            await api.delete(`/Lancamentos/${id}`);

            carregarLancamentos();

        }

        catch (erro) {

            console.error("Erro ao excluir lançamento:", erro);

        }

    }

    function limparFormulario() {

        setDescricao("");
        setCategoria("");
        setTipo("");
        setValor("");
        setData("");

        setEditandoId(null);

    }

    return (

        <>

            <h1>Lançamentos</h1>

            <form onSubmit={salvarLancamento}>

                <FormInput
                    label="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <FormInput
                    label="Categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                />

                <FormInput
                    label="Tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                />

                <FormInput
                    label="Valor"
                    type="number"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                />

                <FormInput
                    label="Data"
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />

                <Button type="submit">

                    {

                        editandoId !== null

                            ? "Salvar Alterações"

                            : "Cadastrar Lançamento"

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

                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        lancamentos.map((lancamento) => (

                            <tr key={lancamento.id}>

                                <td>{lancamento.descricao}</td>
                                <td>{lancamento.categoria}</td>
                                <td>{lancamento.tipo}</td>
                                <td>R$ {Number(lancamento.valor).toFixed(2)}</td>
                                <td>{new Date(lancamento.data).toLocaleDateString()}</td>

                                <td>

                                    <Button
                                        type="button"
                                        onClick={() => editarLancamento(lancamento)}
                                    >
                                        Editar
                                    </Button>

                                    {" "}

                                    <Button
                                        type="button"
                                        onClick={() => excluirLancamento(lancamento.id)}
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

export default Lancamentos;
