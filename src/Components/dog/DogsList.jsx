import { useState, useEffect } from "react";
import Global from "../../helpers/Global";

const DogsList = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const fetchDogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(Global.baseUrl + `/api/dogs`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data) {
        setDogs(data);
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
    fetchDogs();
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
                  <th className="custom-th">Nombre</th>
                  <th className="custom-th">color</th>
                  <th className="custom-th">Edad</th>
                  <th className="custom-th">Peso</th>
                  <th className="custom-th">Tamaño</th>
                  <th className="custom-th">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {dogs.length > 0 &&
                  dogs.map((dog) => (
                    <tr key={dog.dogId}>
                      <td>{dog.fullName}</td>
                      <td>{dog.color}</td>
                      <td>{dog.age}</td>
                      <td>{dog.weight}</td>
                      <td>{dog.size}</td>

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

export default DogsList;
