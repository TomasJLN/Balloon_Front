import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFiltered } from "../../hooks/useFiltered";
import { ExperienceCard } from "../experienceCard/ExperienceCard";
import { toast } from "react-toastify";
import { ToTop } from "../toTop/ToTop";
import "./show-results.css";

const ShowResults = ({ isVisible, setIsVisible }) => {
  //Experiencias mostradas por página
  const expByPage = 6;

  const location = useLocation();

  const [lastIndex, setLastIndex] = useState(expByPage);

  const [btnMore, setBtnMore] = useState(false);

  const q = location.search;

  let query = q;

  query.length < 1 ? (query = "?experience=&active=1&featured=1") : (query = q);

  const { filtered, loading, error } = useFiltered(query);

  const pagFiltered = filtered.slice(0, lastIndex);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  useEffect(() => {
    setLastIndex(expByPage);
    setBtnMore(true);
  }, [query]);

  useEffect(() => {
    if (filtered.length > 0 && lastIndex >= filtered.length) {
      setBtnMore(false);
    }
  }, [filtered, lastIndex]);

  const handleLoadMore = () => {
    if (lastIndex >= filtered.length) {
      setBtnMore(false);
    } else {
      setBtnMore(true);
      setLastIndex(lastIndex + expByPage);
    }
  };

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <ToTop isVisible={isVisible} setIsVisible={setIsVisible} />
          <div className="card-deck fade_in">
            {pagFiltered.length > 0 ? (
              pagFiltered.map((exp) => (
                <ExperienceCard key={exp.id} exp={exp} />
              ))
            ) : (
              <h1 className="info fade_in">No se encontraron resultados</h1>
            )}
          </div>
          {btnMore && (
            <button onClick={handleLoadMore} className="show-more">
              Cargar más...
            </button>
          )}
        </>
      )}
    </>
  );
};

export default ShowResults;
