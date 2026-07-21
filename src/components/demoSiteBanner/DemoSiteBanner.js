import { FaFlask } from 'react-icons/fa';
import { Link } from 'react-router';
import './demo-site-banner.css';

export const DemoSiteBanner = () => (
  <aside className="demo-site-banner" aria-label="Aviso de sitio demostrativo">
    <div className="demo-site-banner-inner">
      <span className="demo-site-banner-label">
        <FaFlask aria-hidden="true" />
        Proyecto académico
      </span>
      <p>Experiencias, pagos y reservas simulados. No es una tienda real.</p>
      <Link to="/aviso-legal">Aviso legal</Link>
    </div>
  </aside>
);
