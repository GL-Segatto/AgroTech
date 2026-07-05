import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import "./Layout.css";

function Layout({children}){
  return(
    <>
      <Navbar/>
        <div className="container">
          <Sidebar />
          <main>
            {children}
          </main>
        </div>
    </>
  );
}

export default Layout;
