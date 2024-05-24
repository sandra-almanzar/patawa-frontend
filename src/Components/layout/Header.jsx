import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { auth } = useAuth();

  const location = useLocation();

  // Función para determinar el título basado en la ruta
  const determineTitle = (pathname) => {
    switch (pathname) {
      case "/admin":
        return "Dashboard";
      case "/admin/dogs":
        return "Crear Perro";
      case "/admin/owners":
        return "Propietarios";
      default:
        return "Login";
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between gap-4 pt-3 pb-2 mb-5">
        <h1 className="h2">{determineTitle(location.pathname)}</h1>
        <input
          type="text"
          className="form-control search-bar"
          placeholder="Buscar"
        />
        <div className="profile">
          <img src={auth.avatarUrl} alt="Profile" width="40" height="40" />
          <span className="custom-span">{auth.fullName}</span>
        </div>
      </div>
    </>
  );
};

export default Header;
