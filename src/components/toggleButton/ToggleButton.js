import React from "react";
import ToggleSwitch from "./ToggleSwitch";

const ToggleButton = ({ handleToggle }) => {
	return (
		<>
			<ToggleSwitch handleToggle={handleToggle} label="Filtrar  " />
		</>
	);
};

export default ToggleButton;
