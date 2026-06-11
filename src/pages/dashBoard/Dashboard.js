import { formatDate } from "../../helpers/formatDate";
import { es } from "date-fns/locale";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { TokenContext } from "../../contexts/TokenContext";
import { useGetCategories } from "../../hooks/useGetCategories";
import { useFiltered } from "../../hooks/useFiltered.js";
import { useNavigate } from "react-router";
import { miniFetcher } from "../../helpers/fetcher";
import { DEMO_TOUR_FLAG } from "../../hooks/useDemoTour";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { FaEdit, FaTags, FaGlobe, FaUsers, FaEuroSign, FaTrophy, FaUserCog } from "react-icons/fa";
import "./dashboard.css";

const PIE_COLORS = ["#6366f1", "#22d3ee", "#f59e0b", "#f43f5e", "#10b981", "#a855f7"];

export const Dashboard = () => {
  const navigate = useNavigate();
  const actions = [
    { id: 1, title: "Gestor Categorías",   route: "adminCategory",   icon: <FaTags /> },
    { id: 2, title: "Gestor Experiencias", route: "adminExperience", icon: <FaEdit /> },
    { id: 3, title: "Gestor Usuarios",     route: "adminUsers",      icon: <FaUserCog /> },
  ];

  const [usuario] = useContext(UserContext);
  const [token] = useContext(TokenContext);
  const { categories } = useGetCategories();
  const { filtered } = useFiltered(`?`);
  const [charged, setCharged] = useState({});
  const [totalUsers, setTotalUsers] = useState({});
  const [bestExp, setBestExp] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [categoryBookings, setCategoryBookings] = useState([]);
  const monthName = formatDate(new Date(), "MMMM", { locale: es });

  useEffect(() => {
    const fetchAll = async () => {
      const authOptions = { headers: { Authorization: token } };

      setCharged(await miniFetcher("dashboard", authOptions));
      setBestExp(await miniFetcher("dashboard/bestExp", authOptions));
      setTotalUsers(await miniFetcher("dashboard/totalUsers", authOptions));
      setMonthlyRevenue(await miniFetcher("dashboard/monthlyRevenue", authOptions));
      setCategoryBookings(await miniFetcher("dashboard/bookingsByCategory", authOptions));
    };
    if (!token) return;
    fetchAll();
    return () => {
      setCharged({});
      setBestExp([]);
      setTotalUsers({});
      setMonthlyRevenue([]);
      setCategoryBookings([]);
    };
  }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem(DEMO_TOUR_FLAG)) return;
    localStorage.removeItem(DEMO_TOUR_FLAG);

    const startDashboardTour = async () => {
      const { driver } = await import('driver.js');
      const driverObj = driver({
        showProgress: true,
        nextBtnText: 'Siguiente →',
        prevBtnText: '← Anterior',
        doneBtnText: '✓ Listo',
        progressText: '{{current}} de {{total}}',
        steps: [
          {
            element: '.dash-kpis',
            popover: {
              title: '📊 Indicadores clave',
              description:
                'Facturación del mes actual, número de categorías, experiencias activas y usuarios registrados, todo en tiempo real.',
              side: 'top',
              align: 'start',
            },
          },
          {
            element: '.dash-charts',
            popover: {
              title: '📈 Gráficos de actividad',
              description:
                'Evolución de ingresos en los últimos 6 meses (barras) y distribución de reservas por categoría (tarta).',
              side: 'top',
              align: 'center',
            },
          },
          {
            element: '.dash-best-exp',
            popover: {
              title: '🏆 Top experiencias',
              description:
                'Las 5 experiencias con más reseñas. Haz clic en cualquier fila para editar sus detalles.',
              side: 'top',
              align: 'start',
            },
          },
          {
            element: '.dash-nav',
            popover: {
              title: '🗂️ Gestión de contenidos',
              description:
                'Desde aquí puedes administrar categorías, experiencias y usuarios. Las cuentas viewer solo pueden visualizar, no modificar.',
              side: 'bottom',
              align: 'start',
            },
          },
        ],
      });

      driverObj.drive();
    };

    const timer = setTimeout(startDashboardTour, 1200);
    return () => clearTimeout(timer);
  }, []);

  const kpis = [
    {
      label: "Categorías",
      value: categories.length,
      icon: <FaTags />,
      color: "#6366f1",
    },
    {
      label: "Experiencias",
      value: filtered.length,
      icon: <FaGlobe />,
      color: "#22d3ee",
    },
    {
      label: "Usuarios",
      value: totalUsers?.nUsers != null ? totalUsers.nUsers - 1 : 0,
      icon: <FaUsers />,
      color: "#f59e0b",
    },
    {
      label: `Facturación ${monthName}`,
      value: `${charged?.totalCharged ?? 0} €`,
      icon: <FaEuroSign />,
      color: "#10b981",
    },
  ];

  const hasAccess = usuario.role === "admin" || usuario.role === "viewer";

  return hasAccess ? (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard</h1>

        <div className="dash-nav">
          {actions.map((act) => (
            <button
              key={act.id}
              className="dash-nav-btn"
              onClick={() => navigate(`/dashboard/${act.route}`)}
            >
              {act.icon} {act.title}
            </button>
          ))}
        </div>

        <div className="dash-kpis">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="dash-kpi-card"
              style={{ borderTop: `4px solid ${kpi.color}` }}
            >
              <span className="dash-kpi-icon" style={{ color: kpi.color }}>
                {kpi.icon}
              </span>
              <span className="dash-kpi-value">{kpi.value}</span>
              <span className="dash-kpi-label">{kpi.label}</span>
            </div>
          ))}
        </div>

        <div className="dash-charts">
          <div className="dash-chart-card">
            <h3>Facturación últimos 6 meses</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={monthlyRevenue}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="monthName" tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }} />
                <Tooltip
                  formatter={(v) => [`${v} €`, "Facturación"]}
                  contentStyle={{ background: "#1e1e2e", border: "none", borderRadius: 8 }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="dash-chart-card">
            <h3>Reservas por categoría</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={categoryBookings}
                  dataKey="bookings"
                  nameKey="category"
                  cx="50%"
                  cy="45%"
                  outerRadius={75}
                >
                  {categoryBookings.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v, name) => [v, name]}
                  contentStyle={{ background: "#1e1e2e", border: "none", borderRadius: 8 }}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend
                  formatter={(value) => (
                    <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-best-exp">
          <h3>
            <FaTrophy /> Top experiencias
          </h3>
          <table className="dash-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Experiencia</th>
                <th>Reviews</th>
              </tr>
            </thead>
            <tbody>
              {bestExp.map((exp, i) => (
                <tr
                  key={exp.idExperience}
                  onClick={() =>
                    navigate(
                      `/dashboard/adminExperience/editExperience/${exp.idExperience}`
                    )
                  }
                >
                  <td>{i + 1}</td>
                  <td>{exp.title}</td>
                  <td>{exp.number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div className="not-allowed">
      <h1>No tienes acceso a la zona de Administración</h1>
    </div>
  );
};
