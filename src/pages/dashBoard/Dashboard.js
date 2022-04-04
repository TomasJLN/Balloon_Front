import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { BtnDashboard } from "../../components/btnDashboard/BtnDashboard";
import { UserContext } from "../../contexts/UserContext";
import { useGetCategories } from "../../hooks/useGetCategories";
import { useFiltered } from "../../hooks/useFiltered.js";
import { useNavigate } from "react-router-dom";
import { miniFetcher } from "../../helpers/fetcher";
import "./dashboard.css";
import { FaEdit } from "react-icons/fa";

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
    return () => {
      setCharged(0);
      setBestExp([]);
      setTotalUsers(0);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return usuario.role === "admin" ? (
    <section className="form-wrapper">
      <div className="dashboard-container">
        <h1 id="create-title">Dashboard</h1>
        <div className="list-container">
          {actions.map((act) => (
            <ul>
              <li
                key={act.id}
                style={{ listStyle: "none" }}
                onClick={() => navigate(`/dashboard/${act.route}`)}
              >
                <FaEdit key={act.id} /> {act.title}
              </li>
            </ul>
          ))}
        </div>
        <div>
          <table className="info-table">
            <thead>
              <tr>
                <th>Categorías</th>
                <th>Experiencias</th>
                <th>Usuarios</th>
                <th>Facturación {month.format("MMMM")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{categories.length}</td>
                <td>{filtered.length}</td>
                <td>{totalUsers.nUsers - 1}</td>
                <td>{charged.totalCharged} €</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table className="info-best-exp">
            <thead>
              <tr>
                <th>Mejores experiencias</th>
              </tr>
            </thead>
            <tbody>
              {bestExp.map((exp) => (
                <tr>
                  <td
                    key={exp.idExperience}
                    onClick={() =>
                      navigate(
                        `/dashboard/adminExperience/editExperience/${exp.idExperience}`
                      )
                    }
                  >
                    {exp.title}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  ) : (
    <div className="not-allowed">
      <h1>No tienes acceso a la zona de Administración</h1>
    </div>
  );
};
