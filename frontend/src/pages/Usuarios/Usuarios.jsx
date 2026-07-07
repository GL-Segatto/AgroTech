import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import api from "../../services/api";

function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cargo, setCargo] = useState("");

    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {

        carregarUsuarios();

    }, []);

    async function carregarUsuarios() {

        try {

            const resposta = await api.get("/Usuarios");

            setUsuarios(resposta.data);

        } catch (erro) {

            console.error("Erro ao carregar usuários:", erro);

        }

    }

    async function salvarUsuario(e) {

        e.preventDefault();

        if (!nome || !email || !cargo) {

            alert("Preencha todos os campos.");

            return;

        }

        try {

            if (editandoId !== null) {

                await api.put(`/Usuarios/${editandoId}`, {

                    id: editandoId,
                    nome,
                    email,
                    cargo

                });

            } else {

                await api.post("/Usuarios", {

                    nome,
                    email,
                    cargo

                });

            }

            await carregarUsuarios();

            limparFormulario();

        } catch (erro) {

            console.error("Erro ao salvar usuário:", erro);

        }

    }

    function editarUsuario(usuario) {

        setNome(usuario.nome);
        setEmail(usuario.email);
        setCargo(usuario.cargo);

        setEditandoId(usuario.id);

    }

    async function excluirUsuario(id) {

        if (!confirm("Deseja realmente excluir este usuário?")) {

            return;

        }

        try {

            await api.delete(`/Usuarios/${id}`);

            carregarUsuarios();

        } catch (erro) {

            console.error("Erro ao excluir usuário:", erro);

        }

    }

    function limparFormulario() {

        setNome("");
        setEmail("");
        setCargo("");

        setEditandoId(null);

    }

    return (

        <>

            <h1>Usuários</h1>

            <form onSubmit={salvarUsuario}>

                <FormInput
                    label="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <FormInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <FormInput
                    label="Cargo"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                />

                <Button type="submit">

                    {

                        editandoId !== null

                            ? "Salvar Alterações"

                            : "Cadastrar Usuário"

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
                        <th>Email</th>
                        <th>Cargo</th>
                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        usuarios.map((usuario) => (

                            <tr key={usuario.id}>

                                <td>{usuario.nome}</td>

                                <td>{usuario.email}</td>

                                <td>{usuario.cargo}</td>

                                <td>

                                    <Button
                                        type="button"
                                        onClick={() => editarUsuario(usuario)}
                                    >
                                        Editar
                                    </Button>

                                    {" "}

                                    <Button
                                        type="button"
                                        onClick={() => excluirUsuario(usuario.id)}
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

export default Usuarios;
