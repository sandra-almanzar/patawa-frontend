function Dashboard() {
  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">7</h5>
              <p className="card-text">Total Propietarios</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">17</h5>
              <p className="card-text">Total Perros</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">10</h5>
              <p className="card-text">Total Paseos</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">5</h5>
              <p className="card-text">Total Paseadores</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Perros agregados</h5>
              <canvas id="revenueChart"></canvas>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Paseos realizados</h5>
              <canvas id="customerMap"></canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
