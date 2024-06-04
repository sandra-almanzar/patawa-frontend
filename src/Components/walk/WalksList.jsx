import { useState, useEffect } from "react";
import Global from "../../helpers/Global";

const WalksList = () => {
  const [walks, setWalks] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const fetchWalks = async () => {
    setLoading(true);
    try {
      const response = await fetch(Global.baseUrl + `/api/walks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data) {
        setWalks(data);
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
    fetchWalks();
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
                  <th className="custom-th">Fecha</th>
                  <th className="custom-th">Duración (minutos)</th>
                  <th className="custom-th">Lugar</th>
                  <th className="custom-th">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {walks.length > 0 &&
                  walks.map((walk) => (
                    <tr key={walk.walkId}>
                      <td>{walk.dateTime}</td>
                      <td>{walk.duration}</td>
                      <td>{walk.location}</td>
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

export default WalksList;
