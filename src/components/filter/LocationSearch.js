import { useState, useRef, useEffect } from "react";
import { useFiltered } from "../../hooks/useFiltered";
import { FaMapMarkerAlt, FaChevronDown, FaCheck } from "react-icons/fa";

const LocationSearch = ({ searchLoc, setSearchLoc }) => {
  const { filtered } = useFiltered("?experience=&active=1");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const locations = filtered.filter(
    (ele, ind) =>
      ind === filtered.findIndex((elem) => elem.location === ele.location)
  );

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
        className={`filter-pill${searchLoc ? " filter-pill--active" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <FaMapMarkerAlt className="pill-icon" />
        <span>{searchLoc || "Ciudad"}</span>
        <FaChevronDown className={`pill-chevron${open ? " pill-chevron--open" : ""}`} />
      </button>

      {open && (
        <div className="filter-dropdown">
          <div
            className={`filter-option${!searchLoc ? " filter-option--selected" : ""}`}
            onClick={() => { setSearchLoc(""); setOpen(false); }}
          >
            {!searchLoc && <FaCheck className="filter-option-check" />}
            Todas
          </div>
          {locations.map((loc, index) => (
            <div
              key={index}
              className={`filter-option${searchLoc === loc.location ? " filter-option--selected" : ""}`}
              onClick={() => { setSearchLoc(loc.location); setOpen(false); }}
            >
              {searchLoc === loc.location && <FaCheck className="filter-option-check" />}
              {loc.location}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
