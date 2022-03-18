import { useEffect, useState } from "react";
import { scrollToTop } from "../../helpers/scrollToTop";
import "./to-top.css";

export const ToTop = ({ isVisible, setIsVisible }) => {
  const checkVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
    return () => {
      !isVisible && window.removeEventListener("scroll", checkVisibility);
    };
  }, [isVisible]);

  return (
    <div className="scroll-to-top" onClick={scrollToTop}>
      {isVisible && (
        <div>
          <img src="/imgs/up-arrow.png" alt="Go top" className="icon-to-top" />
        </div>
      )}
    </div>
  );
};
