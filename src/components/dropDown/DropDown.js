import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { useGetCategories } from "../../hooks/useGetCategories";
import { useNavigate } from "react-router-dom";
import "./dropDown.css";

//Traemos el mostrar Menu (setShowNavBar) para ocultarlo una vez se haga click en una categoría
const Dropdown = ({ setShowNavBar }) => {
  const [isActive, setIsActive] = useState(false);
  //Declaramos una constante para poder usar el useNavigate en la página
  const navigate = useNavigate();

  const { categories } = useGetCategories();

  return (
    <ul className="dropdown">
      <li className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
        CATEGORIAS <FaArrowDown className="arrowdown" />
      </li>

      {isActive && (
        <div className="dropdown-content">
          {categories.map((category) => (
            <li
              className="dropdown-item"
              key={category.id}
              category={category}
              //añadimos un onClick en cada elemento de la lista categorías, lo que hará será
              //ocultar la barra del menú (setShowNavBar(false))
              //navegar al filtro de categorías por el nombre de la categoría
              onClick={() => {
                setShowNavBar(false);
                navigate(`/allFilter?category=${category.title}`);
              }}
            >
              {category.title}
            </li>
          ))}
        </div>
      )}
    </ul>
  );
};

export default Dropdown;
