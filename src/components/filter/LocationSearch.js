import { Field } from "formik";
import { useFiltered } from "../../hooks/useFiltered";

const LocationSearch = ({ searchLoc, setSearchLoc }) => {
  const { filtered } = useFiltered("?experience=&active=1");
  let filteredLocations = filtered.filter(
    (ele, ind) =>
      ind === filtered.findIndex((elem) => elem.location === ele.location)
  );

  return (
    <div className="locationSearch">
      <Field
        className="select"
        value={searchLoc}
        onChange={(e) => {
          setSearchLoc(e.target.value);
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
