import { useState, useContext, useEffect } from 'react';
import { TokenContext } from '../../contexts/TokenContext';
import { UserContext } from '../../contexts/UserContext';
import { FilterContext } from '../../contexts/FilterContext';
import mainLogo from '../../mainlogo/logo_balloon_v2_80.webp';
import { useNavigate } from 'react-router';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Avatar } from '../avatar/Avatar';
import NavBar from '../navBar/navBar';
import NavUser from '../navUser/NavUser';
import MenuDesktop from '../menuDesktop/MenuDesktop';
import { useDemoTour } from '../../hooks/useDemoTour';
import './header.css';

export const Header = () => {
  const { setSearchCat, setIsFilterOn } = useContext(FilterContext);
  const [showNavBar, setShowNavBar] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [token] = useContext(TokenContext);
  const [usuario] = useContext(UserContext);

  const navigate = useNavigate();
  const startTour = useDemoTour();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    setShowNavBar(false);
    setUserMenu(false);
    setSearchCat('');
    setIsFilterOn(false);
    navigate('/');
  };

  return (
    <header id="main_header" className={scrolled ? 'scrolled' : ''}>
          <div className="header-inner">
            <nav>
              {showNavBar && <NavBar setShowNavBar={setShowNavBar} />}
              {!showNavBar ? (
                <FaBars
                  className="menuprincipal"
                  onClick={() => setShowNavBar(true)}
                />
              ) : (
                <FaTimes
                  className="menuprincipal"
                  onClick={() => setShowNavBar(false)}
                />
              )}
            </nav>

            <MenuDesktop />

            <button
              type="button"
              onClick={handleClick}
              className="doggy-logo"
              aria-label="Ir a la página de inicio"
            >
              <img src={mainLogo} alt="balloon-logo" width="80" height="80" />
            </button>

            <div className="user-avatar-menu">
              {userMenu && (
                <NavUser setUserMenu={setUserMenu} usuario={usuario} />
              )}
              {!token && (
                <button
                  id="demo-tour-btn"
                  className="demo-btn"
                  onClick={startTour}
                >
                  ▶ Demo
                </button>
              )}
              <Avatar usuario={usuario} setUserMenu={setUserMenu} />
            </div>
          </div>
    </header>
  );
};
