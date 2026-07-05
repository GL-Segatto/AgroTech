import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {

    const [usuarios, setUsuarios] = useState([
        {
            id: 1,
            nome: "Administrador",
            email: "admin@agrotech.com",
            cargo: "Administrador"
        }
    ]);

    const [safras, setSafras] = useState([
        {
            id: 1,
            nome: "Safra Verão 2026",
            cultura: "Milho",
            area: 45
        }
    ]);

    const [categorias, setCategorias] = useState([
        {
            id: 1,
            nome: "Sementes",
            descricao: "Compra de sementes"
        },
        {
            id: 2,
            nome: "Fertilizantes",
            descricao: "Compra de fertilizantes"
        }
    ]);

    const [lancamentos, setLancamentos] = useState([
        {
            id: 1,
            descricao: "Compra de sementes",
            categoria: "Sementes",
            tipo: "Orçado",
            valor: 12000,
            data: "2026-07-05"
        }
    ]);

    return (

        <DataContext.Provider
            value={{

                usuarios,
                setUsuarios,

                safras,
                setSafras,

                categorias,
                setCategorias,

                lancamentos,
                setLancamentos

            }}
        >

            {children}

        </DataContext.Provider>

    );

}

export function useData() {

    return useContext(DataContext);

}
