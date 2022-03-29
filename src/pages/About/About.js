import "./about.css";
import "./accordion.css";
import Accordion from "./Accordion";
import AccordionWrap from "./AccordionWrap";
import fotodani from "../../mainlogo/dani.jpg";
import React, { useEffect } from "react";

const Faq = () => {
	const info = [
		{
			title: "Dani Pereira",
			photo: fotodani,
		},
		{
			title: "Laia March",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In molestie tellus a maximus tempus. Duis vel leo iaculis, porttitor erat et, posuere erat. Ut blandit.",
		},
		{
			title: "Támara Raya",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia, nibh imperdiet tempus pharetra, arcu risus aliquet arcu, a auctor ex lacus efficitur purus. Morbi.",
		},
		{
			title: "Tomás J. Lago",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat lobortis nibh, eu molestie est placerat non. Donec ornare nisl erat, non imperdiet elit porta.",
		},
	];

	/* 	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
 */
	return (
		<div className="faq-container">
			<h1 id="title-about">¿Quienes somos?</h1>
			<AccordionWrap>
				{info.map((item, index) => (
					<Accordion
						key={index}
						index={index}
						title={item.title}
						photo={item.photo}
					/>
				))}
			</AccordionWrap>
		</div>
	);
};

export default Faq;
