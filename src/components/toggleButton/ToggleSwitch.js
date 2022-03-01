import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ handleToggle, label }) => {
	return (
		<div className="container">
			<div className="toggle-switch">
				<input
					onClick={handleToggle}
					type="checkbox"
					className="checkbox"
					name={label}
					id={label}
				/>
				<label className="label" htmlFor={label}>
					<span className="inner" />
					<span className="switch" />
				</label>
			</div>
		</div>
	);
};

export default ToggleSwitch;
