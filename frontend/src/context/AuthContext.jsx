import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    function login(email, password) {

        // Login temporário
        if (email === "admin@agrotech.com" && password === "123") {

            const loggedUser = {
                nome: "Administrador",
                email: email
            };

            localStorage.setItem("token", "agrotech-token");
            localStorage.setItem("user", JSON.stringify(loggedUser));

            setUser(loggedUser);

            return true;
        }

        return false;
    }

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
    }

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );
}

export function useAuth() {
    return useContext(AuthContext);
}
