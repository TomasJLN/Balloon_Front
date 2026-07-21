import { useEffect, useRef, useState } from 'react';
import { FaArrowRight, FaGraduationCap, FaTimes } from 'react-icons/fa';
import mainLogo from '../../mainlogo/logo_balloon_v2_80.webp';
import './student-project-notice.css';

const NOTICE_SESSION_KEY = 'balloon-student-project-notice-seen';

const shouldShowNotice = () => {
  try {
    return sessionStorage.getItem(NOTICE_SESSION_KEY) !== 'true';
  } catch {
    return true;
  }
};

export const StudentProjectNotice = () => {
  const [isOpen, setIsOpen] = useState(shouldShowNotice);
  const dialogRef = useRef(null);
  const continueButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    try {
      sessionStorage.setItem(NOTICE_SESSION_KEY, 'true');
    } catch {
      // The notice still works if the browser blocks session storage.
    }

    const previousOverflow = document.body.style.overflow;
    const previouslyFocusedElement = document.activeElement;
    document.body.style.overflow = 'hidden';
    continueButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);

      if (event.key === 'Tab') {
        const focusableElements = dialogRef.current?.querySelectorAll('button');
        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="student-notice-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false);
      }}
    >
      <section
        ref={dialogRef}
        className="student-notice"
        role="dialog"
        aria-modal="true"
        aria-labelledby="student-notice-title"
        aria-describedby="student-notice-description"
      >
        <button
          className="student-notice-close"
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar aviso"
        >
          <FaTimes aria-hidden="true" />
        </button>

        <div className="student-notice-visual" aria-hidden="true">
          <span className="student-notice-orbit student-notice-orbit-one" />
          <span className="student-notice-orbit student-notice-orbit-two" />
          <div className="student-notice-logo">
            <img src={mainLogo} alt="" width="80" height="80" />
          </div>
        </div>

        <div className="student-notice-content">
          <span className="student-notice-eyebrow">
            <FaGraduationCap aria-hidden="true" />
            Proyecto formativo
          </span>

          <h1 id="student-notice-title">Antes de comenzar tu aventura…</h1>

          <p id="student-notice-description">
            <strong>Balloon es un proyecto creado por estudiantes, no una web
            comercial real.</strong> Las experiencias, reservas y pagos que ves
            aquí son demostrativos y no generan ninguna transacción real.
          </p>

          <div className="student-notice-reassurance">
            Explora, prueba y disfruta con total tranquilidad.
          </div>

          <button
            ref={continueButtonRef}
            className="student-notice-action"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Entendido, explorar Balloon
            <FaArrowRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
};
