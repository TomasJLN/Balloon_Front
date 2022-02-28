import "./filter.css";

import Slider from "@mui/material/Slider";

const PriceSearch = ({ setSearchPrice, searchPrice }) => {
	return (
		<div className="priceSearch">
			<Slider
				color="secondary"
				sx={{ width: "200px" }}
				min={0}
				max={1000}
				step={100}
				value={searchPrice}
				onChange={(e) => {
					setSearchPrice(e.target.value);
					console.log(searchPrice);
				}}
				valueLabelDisplay="auto"
			/>
			{searchPrice && <p>{`${searchPrice[0]}€ - ${searchPrice[1]}€`}</p>}
		</div>
	);
};

export default PriceSearch;
