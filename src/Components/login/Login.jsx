import logo from "../../assets/images/patawa-logo.png";
import illustration from "../../assets/images/illustracion.png";
import "../../assets/css/login.css";
import toast, { Toaster } from "react-hot-toast";
import useForm from "../../hooks/useForm";
import Global from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const { form, changed } = useForm({});
  const loginUser = async (e) => {
    e.preventDefault();
    //peticion al backend
    try {
      const request = await fetch(Global.baseUrl + "/api/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await request.json();
      if (data.error) {
        toast.error("email o contraseña incorrectos");
      } else {
        //persistir los datos
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.tokenUser));
        toast.success("usuario identificado correctamente");

        //set auth
        setAuth(data.tokenUser);
        //redireccion
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error("se ha presentado un problema intente nuevamente");
    }
  };
  return (
    <>
      {!auth.userId ? (
        <div className="login-page container-fluid ">
          <Toaster
            toastOptions={{
              success: {
                style: {
                  background: "green",
                  color: "white",
                },
              },
              error: {
                style: {
                  background: "red",
                  color: "white",
                },
              },
            }}
          />
          <div className="row">
            <div className="col-12">
              <img src={logo} alt="Logo Patawa" className="logo" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img src={illustration} alt="Dog Walker" className="dog-walker" />
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <div className="login-form-container">
                <h2 className="mb-4 text-color-one">Bienvenidos</h2>
                <form className="mb-5" onSubmit={loginUser}>
                  <div className="form-group ">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                      onChange={changed}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Contraseña"
                      onChange={changed}
                    />
                  </div>
                  <button type="submit" className="btn">
                    Ingresar
                  </button>
                </form>
                {/* <a href="#" className="forgot-password text-color-one">
              Olvidó su contraseña?
            </a> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/admin" />
      )}
    </>
  );
};

export default Login;
