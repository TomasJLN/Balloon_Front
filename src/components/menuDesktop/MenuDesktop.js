import React, { useContext, useState } from "react";
import "./menuDesktop.css";
import "../header/header.css";
import { Link, useNavigate, useLocation } from "react-router";
import { FilterContext } from "../../contexts/FilterContext";
import { useGetCategories } from "../../hooks/useGetCategories";
import { FaChevronDown } from "react-icons/fa";

const MenuDesktop = () => {
  const { setSearchCat, setIsFilterOn } = useContext(FilterContext);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { categories } = useGetCategories();

  return (
    <div className="menuescritorio">
      <menu className="menunavegacionDesktop">
        <li className={`itemmenuescritorio${pathname === "/" ? " active" : ""}`}>
          <Link to="/">Inicio</Link>
        </li>

        <div
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
          className="both"
        >
          <li className={`itemmenuescritorio${pathname.startsWith("/allFilter") ? " active" : ""}`}>
            Categorías
            <FaChevronDown
              style={{
                fontSize: "0.7rem",
                transition: "transform 0.2s ease",
                transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </li>

          {isActive && (
            <div className="drop-cat">
              {categories.map((category) => (
                <li
                  className="itemmenucategory"
                  key={category.id}
                  onClick={() => {
                    setSearchCat(category.title);
                    navigate(`/allFilter?category=${category.title}`);
                    setIsFilterOn(true);
                    setIsActive(false);
                  }}
                >
                  {category.title}
                </li>
              ))}
            </div>
          )}
        </div>

        <li className={`itemmenuescritorio${pathname === "/about" ? " active" : ""}`}>
          <Link to="/about">Nosotras</Link>
        </li>
      </menu>
    </div>
  );
};

export default MenuDesktop;
