import { Field } from "formik";
import { useGetCategories } from "../../hooks/useGetCategories.js";

const CategorySearch = ({ searchCat, setSearchCat }) => {
	const { categories } = useGetCategories();
	return (
		<div className="categorySearch">
			<p>Categoría</p>
			<Field
				className="generalFilter"
				value={searchCat}
				onChange={(e) => {
					setSearchCat(e.target.value);
				}}
				name="categoryfilter"
				as="select"
			>
				<option className="option" value="">
					Todas
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
