import { useEffect, useState } from "react";
import { scrollToTop } from "../../helpers/scrollToTop";
import "./to-top.css";

export const ToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const checkVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    isVisible && window.addEventListener("scroll", checkVisibility);
    isVisible && console.log("montado");
    return () => {
      !isVisible && window.removeEventListener("scroll", checkVisibility);
      console.log("desmontado");
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