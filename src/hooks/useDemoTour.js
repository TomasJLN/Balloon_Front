import { useContext, useCallback, useEffect, useRef } from 'react';
import { TokenContext } from '../contexts/TokenContext';
import { useNavigate, useLocation } from 'react-router';
import { miniFetcher } from '../helpers/fetcher';

export const DEMO_TOUR_FLAG = 'balloon_demo_continue';

export const useDemoTour = () => {
  const [, setToken] = useContext(TokenContext);
  const navigate = useNavigate();
  const location = useLocation();
  const pendingDriverRef = useRef(null);

  // When navigation to '/' completes, start the pending tour
  useEffect(() => {
    if (location.pathname === '/' && pendingDriverRef.current) {
      const driverObj = pendingDriverRef.current;
      pendingDriverRef.current = null;
      // Small delay so all home-page elements have rendered
      setTimeout(() => driverObj.drive(), 150);
    }
  }, [location.pathname]);

  return useCallback(async () => {
    await import('driver.js/dist/driver.css');
    const { driver } = await import('driver.js');

    const loginAndNavigate = async () => {
      const data = await miniFetcher('user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'viewer@demo.com', password: '123456' }),
      });
      if (typeof data === 'string' && data.length > 10) {
        setToken(data);
        localStorage.setItem(DEMO_TOUR_FLAG, '1');
        navigate('/dashboard');
      } else {
        navigate('/account');
      }
    };

    const driverObj = driver({
      showProgress: true,
      nextBtnText: 'Siguiente →',
      prevBtnText: '← Anterior',
      doneBtnText: 'Ir al panel →',
      progressText: '{{current}} de {{total}}',
      onNextClick: (element, step, { driver: d }) => {
        if (d.isLastStep()) {
          d.destroy();
          loginAndNavigate();
        } else {
          d.moveNext();
        }
      },
      steps: [
        {
          element: '#principal',
          popover: {
            title: '👋 Bienvenido a Balloon',
            description:
              'Explora experiencias únicas: vuelos en globo, rutas de aventura, gastronomía y mucho más.',
            side: 'bottom',
            align: 'start',
          },
        },
        {
          element: '.searchContainer',
          popover: {
            title: '🔍 Búsqueda inteligente',
            description:
              'Busca por nombre o elige una fecha. Después filtra por categoría, precio o valoración.',
            side: 'bottom',
            align: 'center',
          },
        },
        {
          element: '.card-deck',
          popover: {
            title: '🎈 Experiencias destacadas',
            description:
              'Cada tarjeta muestra precio, plazas y valoración media. Haz clic en una para ver los detalles y reservar.',
            side: 'top',
            align: 'start',
          },
        },
        {
          element: '#demo-tour-btn',
          popover: {
            title: '🔐 Panel de administración',
            description:
              'Pulsa "Ir al panel →" para acceder al dashboard con datos reales. Iniciaremos sesión automáticamente con una cuenta de demostración.',
            side: 'bottom',
            align: 'end',
          },
        },
      ],
    });

    if (window.location.pathname === '/') {
      driverObj.drive();
    } else {
      // Store driver, navigate to home — useEffect above will start it once rendered
      pendingDriverRef.current = driverObj;
      navigate('/');
    }
  }, [setToken, navigate]);
};
