import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AccordionContext } from "./AccordionWrap";
import profileImage from "../../../src/mainlogo/balloon-logo.png";
import { FaLinkedin } from "react-icons/fa";
import "./about.css";
const AccordionItem = (props) => {
	let indexPlus;

	const indexCount = (index) => {
		indexPlus = index + 1;
		return indexPlus;
	};

	const { active, setActive } = useContext(AccordionContext);

	const eventHandler = (e, index) => {
		e.preventDefault();
		setActive(index);
	};

	return (
		<div className="accordion-item">
			<h3 className="accordion-title">
				<button
					onClick={(e) => eventHandler(e, props.index)}
					className={active === props.index ? "active" : "inactive"}
					aria-expanded={active === props.index ? "true" : "false"}
					aria-controls={"sect-" + indexCount(props.index)}
					aria-disabled={active === props.index ? "true" : "false"}
				>
					<span style={{ textAlign: "center" }} className="title-wrapper">
						{props.title}
					</span>
					<span className="icon-wrapper">
						<span className={active === props.index ? "plus" : "minus"}></span>
					</span>
				</button>
			</h3>
			<div className="accordion-panel">
				<div
					id={"sect-" + indexCount(props.index)}
					className={active === props.index ? "panel-open" : "panel-close"}
				>
					<img
						className="profile-thumbnail"
						src={props.photo}
						alt="profileimage"
					/>
					<p>lorem ipsum...</p>
					<div
						style={{ display: "flex", fontSize: "25px" }}
						className="contact-icons"
					>
						<FaLinkedin />
						<FaLinkedin />
						<FaLinkedin />
					</div>
				</div>
			</div>
		</div>
	);
};

AccordionItem.propTypes = {
	index: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export default AccordionItem;
