import { useState, useEffect } from "react";
import Global from "../../helpers/Global";

const OwnersList = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);

  const roleName = "propietario";
  const token = localStorage.getItem("token");
  const fetchOwners = async () => {
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
        setOwners(data);
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
    fetchOwners();
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
                  <th className="custom-th">Email</th>
                  <th className="custom-th">Dirección</th>
                  <th className="custom-th">Teléfono</th>
                  <th className="custom-th">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {owners.length > 0 &&
                  owners.map((owner) => (
                    <tr key={owner.userId}>
                      <td>{owner.documentNumber}</td>
                      <td>{owner.documentTypeId}</td>
                      <td>{owner.fullName}</td>
                      <td>{owner.email}</td>
                      <td>
                        {owner.Addresses.map((address) => (
                          <p>{`${address.addressDetail}/${address.city}`}</p>
                        ))}
                      </td>
                      <td>
                        {owner.Phones.map((phone) => (
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

export default OwnersList;
