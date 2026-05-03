import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TokenContext } from "../../contexts/TokenContext";
import { UserContext } from "../../contexts/UserContext";
import { miniFetcher } from "../../helpers/fetcher";
import { toast } from "react-toastify";
import { FaUsers, FaArrowLeft, FaUserShield, FaUser } from "react-icons/fa";
import "../../styles/admin-panel.css";

export const AdminUsers = () => {
  const [token] = useContext(TokenContext);
  const [usuario] = useContext(UserContext);
  const isViewer = usuario?.role === "viewer";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toSearch, setToSearch] = useState("");
  const [toggling, setToggling] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const data = await miniFetcher("user/list", {
        headers: { Authorization: token },
      });
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        toast.error("No se pudo cargar la lista de usuarios");
      }
      setLoading(false);
    };
    fetchUsers();
  }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleToggle = async (userId) => {
    setToggling(userId);
    const data = await miniFetcher(`user/toggle/${userId}`, {
      method: "PUT",
      headers: { Authorization: token },
    });
    if (data && typeof data.active === "number") {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, active: data.active } : u))
      );
    } else {
      toast.error("Error al cambiar el estado del usuario");
    }
    setToggling(null);
  };

  const filtered = users.filter((u) => {
    const q = toSearch.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.surname.toLowerCase().includes(q) ||
      (u.email ?? "").toLowerCase().includes(q)
    );
  });

  const initials = (u) =>
    `${u.name[0] ?? ""}${u.surname[0] ?? ""}`.toUpperCase();

  return (
    <div className="dashboard-page">
    <section className="form-wrapper">
      <div className="admin-panel-container">
        <div className="admin-panel-header">
          <h1 onClick={() => navigate("/dashboard")}>
            <FaUsers /> Gestionar Usuarios
          </h1>
          <span className="admin-kpi">
            Total <strong>{users.length}</strong>
          </span>
        </div>

        <div className="admin-panel-toolbar">
          <input
            className="admin-search"
            type="text"
            value={toSearch}
            onChange={(e) => setToSearch(e.target.value)}
            placeholder="Buscar por nombre o email..."
          />
          <button
            className="dash-nav-btn"
            onClick={() => navigate("/dashboard")}
          >
            <FaArrowLeft /> Dashboard
          </button>
        </div>

        {loading ? (
          <div className="admin-empty">Cargando usuarios...</div>
        ) : filtered.length < 1 ? (
          <div className="admin-empty">No hay resultados a mostrar</div>
        ) : (
          <div className="admin-users-table-wrap">
            <table className="admin-users-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Nombre</th>
                  {!isViewer && <th>Email</th>}
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Registro</th>
                  {!isViewer && <th>Acción</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id}>
                    <td>
                      {u.avatar ? (
                        <img
                          className="user-avatar"
                          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${u.avatar}`}
                          alt={u.name}
                        />
                      ) : (
                        <div className="user-initials">{initials(u)}</div>
                      )}
                    </td>
                    <td>
                      {u.name} {u.surname}
                    </td>
                    {!isViewer && <td>{u.email}</td>}
                    <td>
                      <span
                        className={`badge ${
                          u.role === "admin" ? "badge-admin" : "badge-user"
                        }`}
                      >
                        {u.role === "admin" ? <FaUserShield /> : <FaUser />}{" "}
                        {u.role}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          u.active ? "badge-active" : "badge-inactive"
                        }`}
                      >
                        {u.active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td>
                      {new Date(u.createdAt).toLocaleDateString("es-ES")}
                    </td>
                    {!isViewer && (
                      <td>
                        {u.role !== "admin" && (
                          <button
                            className="btn-toggle"
                            onClick={() => handleToggle(u.id)}
                            disabled={toggling === u.id}
                          >
                            {u.active ? "Desactivar" : "Activar"}
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
    </div>
  );
};
