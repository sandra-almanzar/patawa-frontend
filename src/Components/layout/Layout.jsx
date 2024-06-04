import { Navigate, Outlet } from "react-router-dom";
import "../../assets/css/layout.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import useAuth from "../../hooks/useAuth";

const Layout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <h1>Cargando...</h1>;
  } else {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <Sidebar></Sidebar>

            <main
              role="main"
              className="col-md-9 ml-sm-auto col-lg-10 px-md-4 content"
            >
              <Header></Header>
              <div className="outlet">
                {auth.userId ? <Outlet></Outlet> : <Navigate to="/" />}
              </div>
            </main>
          </div>
          <Footer></Footer>
        </div>
      </>
    );
  }
};

export default Layout;
