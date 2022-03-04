import "./filter.css";

import Slider from "@mui/material/Slider";

const PriceSearch = ({ setSearchPrice, searchPrice }) => {
  return (
    <div className="priceSearch">
      {searchPrice[0] <= 1 && searchPrice[1] >= 1000 ? (
        <p>Filtrar por precio</p>
      ) : (
        <p>{`${searchPrice[0]}€ - ${searchPrice[1]}€`}</p>
      )}
      <Slider
        color="secondary"
        sx={{ width: "200px" }}
        min={0}
        max={1000}
        step={25}
        value={searchPrice}
        onChange={(e) => {
          setSearchPrice(e.target.value);
        }}
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default PriceSearch;
