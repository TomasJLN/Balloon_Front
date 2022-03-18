import { Field } from "formik";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ toSearch, setToSearch }) => {
	return (
		<div className="searchBar">
			<Field
				className="input-search"
				type="text"
				name="searchText"
				value={toSearch}
				onChange={(e) => {
					setToSearch(e.target.value);
				}}
				autoComplete="off"
				placeholder="Buscar...."
			/>
			<button className="button-search">
				<FaSearch />
			</button>
		</div>
	);
};

export default SearchBar;
