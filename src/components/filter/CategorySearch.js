import { useState, useRef, useEffect } from "react";
import { useGetCategories } from "../../hooks/useGetCategories.js";
import { FaThList, FaChevronDown, FaCheck } from "react-icons/fa";

const CategorySearch = ({ searchCat, setSearchCat }) => {
  const { categories } = useGetCategories();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

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
        className={`filter-pill${searchCat ? " filter-pill--active" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <FaThList className="pill-icon" />
        <span>{searchCat || "Categoría"}</span>
        <FaChevronDown className={`pill-chevron${open ? " pill-chevron--open" : ""}`} />
      </button>

      {open && (
        <div className="filter-dropdown">
          <div
            className={`filter-option${!searchCat ? " filter-option--selected" : ""}`}
            onClick={() => { setSearchCat(""); setOpen(false); }}
          >
            {!searchCat && <FaCheck className="filter-option-check" />}
            Todas
          </div>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`filter-option${searchCat === cat.title ? " filter-option--selected" : ""}`}
              onClick={() => { setSearchCat(cat.title); setOpen(false); }}
            >
              {searchCat === cat.title && <FaCheck className="filter-option-check" />}
              {cat.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySearch;
