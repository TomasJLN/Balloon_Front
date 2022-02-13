import './faq.css';
import './accordion.css';
import Accordion from './Accordion';
import AccordionWrap from './AccordionWrap';

const Faq = () => {
	const info = [
		{
			title: 'Faq 1',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a consequat nibh. Mauris suscipit arcu at fermentum convallis. Pellentesque consectetur mi in felis maximus posuere.',
		},
		{
			title: 'Faq 2',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In molestie tellus a maximus tempus. Duis vel leo iaculis, porttitor erat et, posuere erat. Ut blandit.',
		},
		{
			title: 'Faq 3',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia, nibh imperdiet tempus pharetra, arcu risus aliquet arcu, a auctor ex lacus efficitur purus. Morbi.',
		},
		{
			title: 'Faq YOU',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat lobortis nibh, eu molestie est placerat non. Donec ornare nisl erat, non imperdiet elit porta.',
		},
	];
	return (
		<div className='faq-container'>
			<h1>FAQ</h1>
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
