import { useState, useContext, useEffect } from "react";
import { TokenContext } from "../../contexts/TokenContext";
import { UserContext } from "../../contexts/UserContext";
import { GiBalloonDog } from "react-icons/gi";
import { useNavigate, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import fetcher from "../../helpers/fetcher";
import { Avatar } from "../avatar/Avatar";
import NavBar from "../navBar/navBar";
import NavUser from "../navUser/NavUser";
import "./header.css";

export const Header = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [token, setToken] = useContext(TokenContext);
  const [usuario, setUsuario] = useContext(UserContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token && token !== "")
      fetcher(setUsuario, setError, setLoading, "user", {
        headers: {
          Authorization: token,
        },
      });
  }, [token, setUsuario]);

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <header id="main_header">
          <nav>
            {showNavBar && <NavBar setShowNavBar={setShowNavBar} />}
            <FaBars
              onClick={() => {
                setShowNavBar(!showNavBar);
              }}
            />
          </nav>

          <Link to="/">
            <GiBalloonDog onClick={refreshPage} />
          </Link>

          <div>
            {userMenu && (
              <NavUser setUserMenu={setUserMenu} usuario={usuario} />
            )}
            <Avatar usuario={usuario} setUserMenu={setUserMenu} />
          </div>
        </header>
      )}
    </>
  );
};
