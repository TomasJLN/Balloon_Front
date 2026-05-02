import { Formik, Form, Field } from "formik";
import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { FilterContext } from "../../contexts/FilterContext";
import SearchBar from "./SearchBar";
import RatingSearch from "./RatingSearch";
import DateSearch from "./DateSearch";
import CategorySearch from "./CategorySearch";
import LocationSearch from "./LocationSearch";
import PriceSearch from "./PriceSearch";
import { FaSlidersH, FaSort, FaTimes } from "react-icons/fa";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "./filter.css";

const Filter = () => {
  const {
    toSearchTit, setToSearchTit,
    toSearch, setToSearch,
    searchCat, setSearchCat,
    isFilterOn, setIsFilterOn,
  } = useContext(FilterContext);
  const datePickerRef = useRef();
  const navigate = useNavigate();

  const [rating, setRating] = useState("");
  const [searchLoc, setSearchLoc] = useState("");
  const [searchPrice, setSearchPrice] = useState([1, 300]);
  const [searchDate, setSearchDate] = useState("");
  const [order, setOrder] = useState("");

  const filterResults = useRef(null);

  const scrollToBottom = () => {
    filterResults.current?.scrollIntoView({ behavior: "smooth" });
  };

  const resetFilter = () => {
    setSearchCat("");
    setSearchLoc("");
    setSearchPrice([1, 300]);
    setRating("");
    setSearchDate("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetFilter();

    setToSearchTit(true);
    navigate(`/allFilter?experience=${toSearch}`);
    setIsFilterOn(true);
    scrollToBottom();
  };

  useEffect(() => {
    let query = toSearch ? `/allFilter?experience=${toSearch}&active=1` : `/?`;
    query += order ? `&direction=${order}` : "";
    query += searchPrice[0] === 1 ? "" : `&start_price=${searchPrice[0]}`;
    query += searchPrice[1] === 300 ? "" : `&end_price=${searchPrice[1]}`;
    query += searchCat ? `&category=${searchCat}` : "";
    query += searchLoc ? `&location=${searchLoc}` : "";
    query += searchDate ? `&start=${searchDate[0]}` : "";
    query += searchDate.length > 1 ? `&end=${searchDate[1]}` : "";
    query += rating ? `&ratin=${rating}` : "";
    navigate(query);
  }, [order, searchCat, searchLoc, searchPrice, searchDate, rating]);

  return (
    <>
      <Formik>
        {() => (
          <Form onSubmit={handleSubmit}>
            <div className="hero">
              <div id="principal">
                <h1>Encuentra la experiencia que estabas buscando</h1>
              </div>

              <div className="searchContainer">
                <SearchBar toSearch={toSearch} setToSearch={setToSearch} />

                <DateSearch
                  datePickerRef={datePickerRef}
                  searchDate={searchDate}
                  setSearchDate={setSearchDate}
                />
              </div>
            </div>
            <div ref={filterResults}></div>
            {isFilterOn && (
              <div className="filterContainer slideInDownfade_in">
                <div className="filter-pills-row">
                  <span className="filter-label"><FaSlidersH /> Filtrar:</span>

                  <CategorySearch searchCat={searchCat} setSearchCat={setSearchCat} />
                  <LocationSearch searchLoc={searchLoc} setSearchLoc={setSearchLoc} />
                  <PriceSearch searchPrice={searchPrice} setSearchPrice={setSearchPrice} />
                  <RatingSearch rating={rating} setRating={setRating} />

                  <button
                    className="filter-clear-btn"
                    onClick={(e) => { e.preventDefault(); resetFilter(); setToSearch(""); }}
                  >
                    <FaTimes /> Limpiar
                  </button>
                </div>
              </div>
            )}
            <div className="order-by">
              <FaSort className="order-icon" />
              <label htmlFor="order-select">Ordenar por</label>
              <Field
                id="order-select"
                className="order-select"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                name="locationfilter"
                as="select"
              >
                <option value="ASC">Más baratos primero</option>
                <option value="DESC">Más caros primero</option>
              </Field>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Filter;
