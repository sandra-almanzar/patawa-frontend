import { Routes, Route, BrowserRouter, Navigate, Link } from "react-router-dom";
import Layout from "../Components/layout/Layout";
import Dashboard from "../Components/dashboard/Dashboard";
import Login from "../Components/login/Login";
import OwnersList from "../Components/user/OwnersList";
import { AuthProvider } from "../context/AuthProvider";
import Logout from "../Components/login/Logout";
import DogsList from "../Components/dog/DogsList";
import WalkersList from "../Components/user/WalkersList";
import WalksList from "../Components/walk/WalksList";
export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" index element={<Login />}></Route>
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path="owners" element={<OwnersList />}></Route>
            <Route path="dogs" element={<DogsList />}></Route>
            <Route path="walkers" element={<WalkersList />}></Route>
            <Route path="walks" element={<WalksList />}></Route>
            <Route path="logout" element={<Logout />}></Route>
          </Route>
          <Route
            path="*"
            element={
              <>
                <p>
                  <h1>Error 404</h1>
                  <Link to="/">Volver al inicio</Link>
                </p>
              </>
            }
          ></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
