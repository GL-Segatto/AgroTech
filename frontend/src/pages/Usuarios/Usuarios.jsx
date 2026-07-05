import { useState } from "react";
import { useData } from "../../context/DataContext";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";

function Usuarios() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cargo, setCargo] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    const { usuarios, setUsuarios } = useData();

    function salvarUsuario(e) {

        e.preventDefault();

        if (!nome || !email || !cargo) {
            alert("Preencha todos os campos.");
            return;
        }

        if (editandoId !== null) {

            const usuariosAtualizados = usuarios.map((usuario) => {

                if (usuario.id === editandoId) {

                    return {
                        ...usuario,
                        nome,
                        email,
                        cargo
                    };

                }

                return usuario;

            });

            setUsuarios(usuariosAtualizados);
            setEditandoId(null);

        } else {

            const novoUsuario = {

                id: Date.now(),
                nome,
                email,
                cargo

            };

            setUsuarios([...usuarios, novoUsuario]);

        }

        setNome("");
        setEmail("");
        setCargo("");

    }

    function editarUsuario(usuario) {

        setNome(usuario.nome);
        setEmail(usuario.email);
        setCargo(usuario.cargo);

        setEditandoId(usuario.id);

    }

    function excluirUsuario(id) {

        setUsuarios(

            usuarios.filter((usuario) => usuario.id !== id)

        );

    }

    return (

        <Layout>

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
                    {editandoId !== null
                        ? "Salvar Alterações"
                        : "Cadastrar Usuário"}
                </Button>

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

                    {usuarios.length === 0 ? (

                        <tr>

                            <td colSpan="4">
                                Nenhum usuário cadastrado.
                            </td>

                        </tr>

                    ) : (

                        usuarios.map((usuario) => (

                            <tr key={usuario.id}>

                                <td>{usuario.nome}</td>

                                <td>{usuario.email}</td>

                                <td>{usuario.cargo}</td>

                                <td>

                                    <Button
                                        onClick={() => editarUsuario(usuario)}
                                    >
                                        Editar
                                    </Button>

                                    {" "}

                                    <Button
                                        onClick={() => excluirUsuario(usuario.id)}
                                    >
                                        Excluir
                                    </Button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </Layout>

    );

}

export default Usuarios;
