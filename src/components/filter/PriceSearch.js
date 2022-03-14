import "./filter.css";

import Slider from "@mui/material/Slider";

const PriceSearch = ({ setSearchPrice, searchPrice }) => {
  return (
    <div className="priceSearch">
      <div className="generalFilter">
        <Slider
          color="secondary"
          sx={{ marginLeft: "15px", marginRight: "15px", width: "200px" }}
          min={0}
          max={1000}
          step={25}
          value={searchPrice}
          onChange={(e) => {
            setSearchPrice(e.target.value);
          }}
          valueLabelDisplay="auto"
          //   aria-label="arialabel"
        />
      </div>
    </div>
  );
};

export default PriceSearch;
