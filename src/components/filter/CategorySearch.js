import { Field } from "formik";
import { useCategories2 } from "../../hooks/useCategories2.js";

const CategorySearch = ({ searchCat, setSearchCat }) => {
	const categories = useCategories2();
	return (
		<div className="categorySearch">
			<Field
				className="select"
				value={searchCat}
				onChange={(e) => {
					setSearchCat(e.target.value);
					console.log(searchCat);
				}}
				name="categoryfilter"
				as="select"
			>
				<option className="option" value="">
					Categoría
				</option>
				{categories.map((cat) => (
					<option className="option" key={cat.id} cat={cat}>
						{cat.title}
					</option>
				))}
			</Field>
		</div>
	);
};

export default CategorySearch;
