import "./about.css";
import "./accordion.css";
import Accordion from "./Accordion";
import AccordionWrap from "./AccordionWrap";

const Faq = () => {
	const info = [
		{
			title: "Dani Pereira",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a consequat nibh. Mauris suscipit arcu at fermentum convallis. Pellentesque consectetur mi in felis maximus posuere.",
		},
		{
			title: "Laia",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In molestie tellus a maximus tempus. Duis vel leo iaculis, porttitor erat et, posuere erat. Ut blandit.",
		},
		{
			title: "Támara",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia, nibh imperdiet tempus pharetra, arcu risus aliquet arcu, a auctor ex lacus efficitur purus. Morbi.",
		},
		{
			title: "Tomás",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat lobortis nibh, eu molestie est placerat non. Donec ornare nisl erat, non imperdiet elit porta.",
		},
	];
	return (
		<div className="faq-container">
			<h1>About</h1>
			<AccordionWrap>
				{info.map((item, index) => (
					<Accordion
						key={index}
						index={index}
						title={item.title}
						description={item.description}
					/>
				))}
			</AccordionWrap>
		</div>
	);
};

export default Faq;
