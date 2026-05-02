import { useEffect } from "react";
import { scrollToTop } from "../../helpers/scrollToTop";
import { FiArrowUp } from "react-icons/fi";
import "./to-top.css";

export const ToTop = ({ isVisible, setIsVisible }) => {
  useEffect(() => {
    const checkVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", checkVisibility, { passive: true });
    return () => window.removeEventListener("scroll", checkVisibility);
  }, [setIsVisible]);

  return (
    <button
      className={`scroll-to-top ${isVisible ? "scroll-to-top--visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Volver arriba"
    >
      <FiArrowUp />
    </button>
  );
};
