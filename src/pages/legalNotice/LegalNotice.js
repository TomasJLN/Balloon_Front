import { useEffect } from 'react';
import { Link } from 'react-router';
import {
  FaArrowLeft,
  FaCreditCard,
  FaDatabase,
  FaFlask,
  FaGraduationCap,
  FaTicketAlt,
} from 'react-icons/fa';
import './legal-notice.css';

const LegalNotice = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="legal-notice-page">
      <div className="legal-notice-container">
        <div className="legal-notice-hero">
          <div className="legal-notice-hero-icon" aria-hidden="true">
            <FaGraduationCap />
          </div>
          <div>
            <p className="legal-notice-kicker">
              <FaFlask aria-hidden="true" /> Información del proyecto
            </p>
            <h1>Aviso legal y carácter demostrativo</h1>
            <p>
              Balloon es un proyecto académico de fin de bootcamp creado con
              fines educativos y de portfolio. No es una plataforma comercial
              ni presta servicios turísticos o de ocio reales.
            </p>
          </div>
        </div>

        <div className="legal-notice-highlight">
          Las experiencias, precios, pagos, reservas, entradas y perfiles que
          aparecen en el sitio son ficticios o se utilizan exclusivamente para
          demostrar su funcionamiento.
        </div>

        <div className="legal-notice-grid">
          <article className="legal-notice-card">
            <FaTicketAlt aria-hidden="true" />
            <h2>Reservas sin validez</h2>
            <p>
              Completar una reserva no genera una relación contractual, no
              garantiza ninguna plaza y no da acceso a una experiencia real.
              Las simulaciones de la sesión se guardan temporalmente en el
              navegador para poder probar el área de usuario.
            </p>
          </article>

          <article className="legal-notice-card">
            <FaCreditCard aria-hidden="true" />
            <h2>Sin pagos reales</h2>
            <p>
              Los métodos de pago son únicamente elementos visuales. Balloon
              no solicita números de tarjeta, credenciales bancarias ni realiza
              cobros, devoluciones o facturación.
            </p>
          </article>

          <article className="legal-notice-card">
            <FaDatabase aria-hidden="true" />
            <h2>Cuenta y datos de demostración</h2>
            <p>
              El acceso se realiza mediante una cuenta ficticia preparada para
              la demo. No introduzcas datos personales, contraseñas habituales,
              información de pago ni documentación real en ninguna parte del
              sitio.
            </p>
          </article>
        </div>

        <section className="legal-notice-content" aria-labelledby="project-responsibility-title">
          <h2 id="project-responsibility-title">Finalidad y responsabilidad</h2>
          <p>
            El contenido se muestra para presentar las capacidades técnicas y
            de diseño del proyecto. No constituye una oferta comercial ni
            asesoramiento profesional. Las marcas, nombres o recursos de
            terceros que pudieran aparecer pertenecen a sus respectivos
            titulares y se utilizan únicamente dentro de este contexto
            demostrativo.
          </p>
          <p>
            La configuración pública del proyecto está orientada a evitar su
            indexación en buscadores. Aun así, cualquier persona que acceda al
            sitio debe tratarlo exclusivamente como una demostración académica.
          </p>
          <p className="legal-notice-updated">Última actualización: julio de 2026.</p>
        </section>

        <Link to="/" className="legal-notice-back">
          <FaArrowLeft aria-hidden="true" /> Volver al inicio
        </Link>
      </div>
    </section>
  );
};

export default LegalNotice;
