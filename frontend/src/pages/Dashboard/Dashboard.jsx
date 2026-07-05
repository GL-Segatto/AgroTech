import Layout from "../../components/Layout/Layout";
import Card from "../../components/Card/Card";

function Dashboard(){

    return(
        <Layout>

            <h1>Dashboard</h1>

            <div
              style={{
                display:"flex",
                gap:"20px",
                marginTop:"25px"
              }}
            >
              <Card titulo="Total Orçado" valor="R$ 150.000"/>
              <Card titulo="Total Realizado" valor="R$ 98.400"/>
              <Card titulo="Saldo" valor="R$ 51.600"/>
              <Card titulo="Safras Ativas" valor="4"/>
            </div>
        </Layout>

    );

}

export default Dashboard;
