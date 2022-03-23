import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { BtnDashboard } from "../../components/btnDashboard/BtnDashboard";
import { UserContext } from "../../contexts/UserContext";
import { useGetCategories } from "../../hooks/useGetCategories";
import { useFiltered } from "../../hooks/useFiltered.js";
import { useNavigate } from "react-router-dom";
import { miniFetcher } from "../../helpers/fetcher";
import "./dashboard.css";

export const Dashboard = () => {
  const navigate = useNavigate();
  const actions = [
    {
      id: 1,
      title: "Gestor Categorías",
      route: "adminCategory",
    },
    {
      id: 2,
      title: "Gestor Experiencias",
      route: "adminExperience",
    },
  ];

  const [usuario, setUsuario] = useContext(UserContext);
  const { categories } = useGetCategories();
  const { filtered, error, loading } = useFiltered(`?`);
  const [charged, setCharged] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [bestExp, setBestExp] = useState([]);
  const month = moment();

  useEffect(() => {
    const totalCharged = async () => {
      setCharged(await miniFetcher("dashboard", {}));
      setBestExp(await miniFetcher("dashboard/bestExp", {}));
      setTotalUsers(await miniFetcher("dashboard/totalUsers", {}));
    };
    totalCharged();
  }, []);

  return usuario.role === "admin" ? (
    <section className="dashboard-section">
      <div className="dashboard-header">
        <h1 id="title-dashboard">Dashboard</h1>
        <button
          className="btn-dashboard-back"
          onClick={() => {
            navigate("/");
          }}
        >
          ↩️ back
        </button>
      </div>
      {actions.map((a) => (
        <BtnDashboard key={a.id} title={a.title} route={a.route} />
      ))}
      <hr />
      <div className="data-dashboard">
        <h3>Nº Categorías: {categories.length}</h3>
        <h3>Nº Experiencias: {filtered.length}</h3>
        <h3>Nº Usuarios: {totalUsers.nUsers - 1}</h3>
        <h3>
          Facturado {month.format("MMMM")}: {charged.totalCharged} €
        </h3>
        <h3>Ranking Experiencias mejor valoradas: </h3>
        {bestExp.map((exp) => (
          <p
            key={exp.title}
            className="best-exp-item"
            onClick={() => navigate(`/experience/${exp.idExperience}`)}
          >
            - {exp.title}
          </p>
        ))}
      </div>
    </section>
  ) : (
    <div className="not-allowed">
      <h1>No tienes acceso a la zona de Administración</h1>
    </div>
  );
};
