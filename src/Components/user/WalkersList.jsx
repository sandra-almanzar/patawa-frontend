import { useState, useEffect } from "react";
import Global from "../../helpers/Global";

const WalkersList = () => {
  const [walkers, setWalkers] = useState([]);
  const [loading, setLoading] = useState(false);

  const roleName = "paseador";
  const token = localStorage.getItem("token");
  const fetchWalkers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        Global.baseUrl + `/api/users/role/${roleName}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data) {
        setWalkers(data);
      } else {
        throw new Error(data.message || "Error al obtener datos");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWalkers();
  }, []);

  return (
    <>
      {loading ? (
        <p>Cargando..</p>
      ) : (
        <div className="row">
          <div className="col">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th className="custom-th">Identificación</th>
                  <th className="custom-th">Tipo de documento</th>
                  <th className="custom-th">Nombre</th>
                  <th className="custom-th">Edad</th>
                  <th className="custom-th">Email</th>
                  <th className="custom-th">Dirección</th>
                  <th className="custom-th">Teléfono</th>
                  <th className="custom-th">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {walkers.length > 0 &&
                  walkers.map((walker) => (
                    <tr key={walker.userId}>
                      <td>{walker.documentNumber}</td>
                      <td>{walker.documentTypeId}</td>
                      <td>{walker.fullName}</td>
                      <td>{walker.age}</td>
                      <td>{walker.email}</td>
                      <td>
                        {walker.Addresses.map((address) => (
                          <p>{`${address.addressDetail}/${address.city}`}</p>
                        ))}
                      </td>
                      <td>
                        {walker.Phones.map((phone) => (
                          <p>{phone.phoneNumber}</p>
                        ))}
                      </td>
                      <td className="actions">
                        <button className="btn btn-edit">
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button className="btn btn-delete">
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default WalkersList;
