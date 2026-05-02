import { useState, useRef, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { FaStar, FaChevronDown } from "react-icons/fa";

const RatingSearch = ({ rating, setRating }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isActive = !!rating;

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="filter-pill-wrap" ref={ref}>
      <button
        type="button"
        className={`filter-pill${isActive ? " filter-pill--active" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <FaStar className="pill-icon" />
        <span>{isActive ? `${rating} estrellas` : "Valoración"}</span>
        <FaChevronDown className={`pill-chevron${open ? " pill-chevron--open" : ""}`} />
      </button>

      {open && (
        <div className="filter-dropdown filter-dropdown--rating">
          <p className="rating-label">Valoración mínima</p>
          <Rating
            fillColor="#1a6b7a"
            emptyColor="#cbd5e0"
            onClick={(val) => { setRating(val); setOpen(false); }}
            initialValue={rating}
            size={28}
            transition
          />
          {isActive && (
            <button
              type="button"
              className="rating-clear"
              onClick={() => { setRating(""); setOpen(false); }}
            >
              Quitar valoración
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RatingSearch;
