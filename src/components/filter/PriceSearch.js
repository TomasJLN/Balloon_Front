import "./filter.css";
import { Field } from "formik";

const PriceSearch = ({
	setSearchStartPrice,
	searchStartPrice,
	searchEndPrice,
	setSearchEndPrice,
}) => {
	return (
		<div className="priceSearch">
			<div className="startPrice">
				{searchStartPrice === "" ? (
					<p>Por precio</p>
				) : (
					`Desde ${searchStartPrice} €`
				)}
				<Field
					className="slider"
					value={searchStartPrice}
					onChange={(e) => {
						setSearchStartPrice(e.target.value);
						console.log(searchStartPrice);
					}}
					name="startpricefilter"
					type="range"
					start={0}
					min={0}
					max={1000}
					step={50}
				/>
			</div>

			{/* <div className="end-price">
				{searchEndPrice === 0 ? (
					<p>Precio máximo</p>
				) : (
					`Hasta ${searchEndPrice} €`
				)}
				<Field
					className="slider"
					value={searchEndPrice}
					onChange={(e) => {
						setSearchEndPrice(e.target.value);
						console.log(searchEndPrice);
					}}
					name="endpricefilter"
					type="range"
					start={0}
					min={0}
					max={1000}
					step={50}
				/>
			</div> */}
		</div>
	);
};

export default PriceSearch;
