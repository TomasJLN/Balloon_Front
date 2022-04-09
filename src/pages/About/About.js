import "./about.css";
import "./accordion.css";
import Accordion from "./Accordion";
import AccordionWrap from "./AccordionWrap";
import fotodani from "../../mainlogo/dani.jpg";
import fototamara from "../../mainlogo/tamara.jpeg";
import fotolaia from "../../mainlogo/laia.jpeg";
import fototom from "../../mainlogo/tom.jpeg";
import React, { useEffect } from "react";

const Faq = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const info = [
    {
      title: "Tamara Raya",
      photo: fototamara,
      description:
        "Junior Full Stack Developer | HTML | CSS | SQL | JavaScript | NodeJS | ReactJS | GIT |",
      link: "https://www.linkedin.com/in/tamara-raya-luque-0692b9226/",
    },
    {
      title: "Tomás J. Lago",
      photo: fototom,
      description: "Soporte remoto y desarrollador Web Full Stack Junior",
      link: "https://www.linkedin.com/in/tom%C3%A1s-j-l-a99107196/",
    },
    {
      title: "Laia March",
      photo: fotolaia,
      description: "Diseñadora y desarrolladora web",
      link: "https://www.linkedin.com/in/laia-march-capdevila-223685226/",
    },

    {
      title: "Dani Pereira",
      photo: fotodani,
      description:
        "Front-End Developer | HTML | CSS | JavaScript | ReactJS | NodeJS | SQL | GIT |",
      link: "https://www.linkedin.com/in/dani-pereira-396618226/",
    },
  ];

  /* 	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
 */
  return (
    <div className="form-wrapper">
      <h1 id="create-title">¿Quienes somos?</h1>
      <div className="generalAbout">
        <AccordionWrap>
          {info.map((item, index) => (
            <Accordion
              key={index}
              index={index}
              title={item.title}
              photo={item.photo}
              description={item.description}
              link={item.link}
            />
          ))}
        </AccordionWrap>
      </div>
    </div>
  );
};

export default Faq;
