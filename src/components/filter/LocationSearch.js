import { Field } from "formik";
import { useLocations } from "../../hooks/useLocations";

const LocationSearch = ({ searchLoc, setSearchLoc }) => {
	const locations = useLocations();
	let filteredLocations = locations.filter(
		(ele, ind) =>
			ind === locations.findIndex((elem) => elem.location === ele.location)
	);

	return (
		<div className="locationSearch">
			<Field
				className="select"
				value={searchLoc}
				onChange={(e) => {
					setSearchLoc(e.target.value);
					console.log(searchLoc);
				}}
				name="locationfilter"
				as="select"
			>
				<option className="option" value="">
					Localización
				</option>
				{filteredLocations.map((loc, index) => (
					<option className="option" key={index}>
						{loc.location}
					</option>
				))}
			</Field>
		</div>
	);
};

export default LocationSearch;
