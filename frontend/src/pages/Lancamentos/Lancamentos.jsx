import { useState } from "react";
import { useData } from "../../context/DataContext";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";

function Lancamentos() {

    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tipo, setTipo] = useState("Orçado");
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");

    const [editandoId, setEditandoId] = useState(null);

    const {
      lancamentos,
      setLancamentos
    } = useData();

    function salvarLancamento(e){

        e.preventDefault();

        if(!descricao || !categoria || !valor || !data){
            alert("Preencha todos os campos.");
            return;
        }

        if(editandoId !== null){

            setLancamentos(

                lancamentos.map(lancamento=>

                    lancamento.id === editandoId
                        ? {
                            ...lancamento,
                            descricao,
                            categoria,
                            tipo,
                            valor,
                            data
                        }
                        : lancamento

                )

            );

            setEditandoId(null);

        }

        else{

            const novo = {

                id: Date.now(),
                descricao,
                categoria,
                tipo,
                valor,
                data

            };

            setLancamentos([...lancamentos, novo]);

        }

        setDescricao("");
        setCategoria("");
        setTipo("Orçado");
        setValor("");
        setData("");

    }

    function editarLancamento(lancamento){

        setDescricao(lancamento.descricao);
        setCategoria(lancamento.categoria);
        setTipo(lancamento.tipo);
        setValor(lancamento.valor);
        setData(lancamento.data);

        setEditandoId(lancamento.id);

    }

    function excluirLancamento(id){

        setLancamentos(

            lancamentos.filter(l=>l.id !== id)

        );

    }

    return(

        <Layout>

            <h1>Lançamentos Financeiros</h1>

            <form onSubmit={salvarLancamento}>

                <FormInput
                    label="Descrição"
                    value={descricao}
                    onChange={(e)=>setDescricao(e.target.value)}
                />

                <FormInput
                    label="Categoria"
                    value={categoria}
                    onChange={(e)=>setCategoria(e.target.value)}
                />

                <label>Tipo</label>

                <select
                    value={tipo}
                    onChange={(e)=>setTipo(e.target.value)}
                >

                    <option>Orçado</option>
                    <option>Realizado</option>

                </select>

                <br/><br/>

                <FormInput
                    label="Valor"
                    type="number"
                    value={valor}
                    onChange={(e)=>setValor(e.target.value)}
                />

                <FormInput
                    label="Data"
                    type="date"
                    value={data}
                    onChange={(e)=>setData(e.target.value)}
                />

                <Button type="submit">

                    {

                        editandoId !== null

                        ?

                        "Salvar Alterações"

                        :

                        "Cadastrar Lançamento"

                    }

                </Button>

            </form>

            <hr/>

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

                        lancamentos.map(l=>(
                            <tr key={l.id}>

                                <td>{l.descricao}</td>

                                <td>{l.categoria}</td>

                                <td>{l.tipo}</td>

                                <td>R$ {l.valor}</td>

                                <td>{l.data}</td>

                                <td>

                                    <Button
                                        onClick={()=>editarLancamento(l)}
                                    >
                                        Editar
                                    </Button>

                                    {" "}

                                    <Button
                                        onClick={()=>excluirLancamento(l.id)}
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

export default Lancamentos;
