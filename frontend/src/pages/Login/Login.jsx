import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    function handleLogin(e) {

        e.preventDefault();

        const success = login(email, password);

        if (success) {

            navigate("/dashboard");

        }

        else {

            alert("Email ou senha inválidos");

        }

    }

    return (

        <form onSubmit={handleLogin}>

            <h1>AgroTech</h1>

            <input

                type="email"

                placeholder="Email"

                value={email}

                onChange={(e) => setEmail(e.target.value)}

            />

            <br />

            <input

                type="password"

                placeholder="Senha"

                value={password}

                onChange={(e) => setPassword(e.target.value)}

            />

            <br />

            <button type="submit">

                Entrar

            </button>

        </form>

    );

}

export default Login;
