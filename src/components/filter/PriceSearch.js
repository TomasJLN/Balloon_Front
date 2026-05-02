import { useState, useRef, useEffect } from "react";
import { FaEuroSign, FaChevronDown } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import "./filter.css";

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
          <Slider
            sx={{
              color: "#1a6b7a",
              "& .MuiSlider-thumb": { width: 16, height: 16 },
            }}
            min={0}
            max={300}
            step={25}
            value={searchPrice}
            onChange={(e) => setSearchPrice(e.target.value)}
            valueLabelDisplay="auto"
          />
        </div>
      )}
    </div>
  );
};

export default PriceSearch;
