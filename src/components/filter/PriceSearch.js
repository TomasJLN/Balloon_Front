import "./filter.css";

import Slider from "@mui/material/Slider";

const PriceSearch = ({ setSearchPrice, searchPrice }) => {
	return (
		<div className="priceSearch">
			<p>Precio</p>
			<div style={{ display: "flex", width: "140px" }}>
				<Slider
					sx={{
						paddingTop: "0px",
						marginLeft: "15px",
						marginRight: "15px",
						"& .MuiSlider-root": {
							padding: "15px",
						},
					}}
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
		</div>
	);
};

export default PriceSearch;
