import { useState, useRef, useEffect } from "react";
import { FaEuroSign, FaChevronDown } from "react-icons/fa";
import "./filter.css";

const MIN = 0;
const MAX = 300;
const STEP = 25;

const PriceSearch = ({ setSearchPrice, searchPrice }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isActive = searchPrice[0] !== 1 || searchPrice[1] !== 300;

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const label = isActive ? `${searchPrice[0]}€ – ${searchPrice[1]}€` : "Precio";

  const minPct = ((searchPrice[0] - MIN) / (MAX - MIN)) * 100;
  const maxPct = ((searchPrice[1] - MIN) / (MAX - MIN)) * 100;
  const trackStyle = {
    background: `linear-gradient(to right, #e2e8f0 ${minPct}%, #1a6b7a ${minPct}%, #1a6b7a ${maxPct}%, #e2e8f0 ${maxPct}%)`,
  };

  return (
    <div className="filter-pill-wrap" ref={ref}>
      <button
        type="button"
        className={`filter-pill${isActive ? " filter-pill--active" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <FaEuroSign className="pill-icon" />
        <span>{label}</span>
        <FaChevronDown className={`pill-chevron${open ? " pill-chevron--open" : ""}`} />
      </button>

      {open && (
        <div className="filter-dropdown filter-dropdown--price">
          <p className="price-range-label">
            {searchPrice[0]}€ &mdash; {searchPrice[1]}€
          </p>
          <div className="price-range-slider" style={trackStyle}>
            <input
              type="range"
              className="range-input"
              min={MIN}
              max={MAX}
              step={STEP}
              value={searchPrice[0]}
              onChange={(e) => {
                const val = Math.min(+e.target.value, searchPrice[1] - STEP);
                setSearchPrice([val, searchPrice[1]]);
              }}
            />
            <input
              type="range"
              className="range-input"
              min={MIN}
              max={MAX}
              step={STEP}
              value={searchPrice[1]}
              onChange={(e) => {
                const val = Math.max(+e.target.value, searchPrice[0] + STEP);
                setSearchPrice([searchPrice[0], val]);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceSearch;
