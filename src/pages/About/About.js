import './about.css';
import fotodani from '../../mainlogo/dani.jpg';
import fototamara from '../../mainlogo/tamara.jpeg';
import fotolaia from '../../mainlogo/laia.jpeg';
import fototom from '../../mainlogo/tom.jpeg';
import React, { useEffect } from 'react';
import { FaLinkedin, FaRocket, FaHeart, FaCode } from 'react-icons/fa';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const team = [
    {
      name: 'Tamara Raya',
      photo: fototamara,
      role: 'Full Stack Developer',
      skills: 'HTML · CSS · JavaScript · Node.js · React · SQL',
      linkedin: 'https://www.linkedin.com/in/tamara-raya-luque-0692b9226/',
    },
    {
      name: 'Tomás J. Lago',
      photo: fototom,
      role: 'Full Stack Developer',
      skills: 'Soporte remoto · Desarrollo web · Node.js · React',
      linkedin: 'https://www.linkedin.com/in/tom%C3%A1s-j-l-a99107196/',
    },
    {
      name: 'Laia March',
      photo: fotolaia,
      role: 'Diseñadora & Desarrolladora Web',
      skills: 'Diseño UI/UX · HTML · CSS · JavaScript · React',
      linkedin: 'https://www.linkedin.com/in/laia-march-capdevila-223685226/',
    },
    {
      name: 'Dani Pereira',
      photo: fotodani,
      role: 'Front-End Developer',
      skills: 'HTML · CSS · JavaScript · React · Node.js · SQL',
      linkedin: 'https://www.linkedin.com/in/dani-pereira-396618226/',
    },
  ];

  const values = [
    {
      icon: <FaRocket />,
      title: 'Innovación',
      text: 'Buscamos constantemente nuevas formas de conectar a las personas con experiencias únicas e inolvidables.',
    },
    {
      icon: <FaHeart />,
      title: 'Pasión',
      text: 'Cada línea de código está escrita con el objetivo de que los usuarios vivan momentos extraordinarios.',
    },
    {
      icon: <FaCode />,
      title: 'Calidad',
      text: 'Nos comprometemos con la excelencia técnica y el diseño cuidado en cada detalle del producto.',
    },
  ];

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero form-wrapper">
        <div className="about-hero-inner">
          <h1 className="about-hero-title">¿Quiénes somos?</h1>
          <p className="about-hero-sub">
            Somos un equipo de desarrolladores apasionados por crear experiencias digitales
            únicas. Balloon nació de nuestra pasión por conectar a las personas con aventuras
            extraordinarias.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="about-values-grid">
          {values.map((v) => (
            <div className="about-value-card" key={v.title}>
              <span className="about-value-icon">{v.icon}</span>
              <h3 className="about-value-title">{v.title}</h3>
              <p className="about-value-text">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <h2 className="about-section-title">El equipo</h2>
        <div className="about-team-grid">
          {team.map((member) => (
            <div className="about-card" key={member.name}>
              <div className="about-card-photo-wrap">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="about-card-photo"
                />
              </div>
              <div className="about-card-body">
                <h2 className="about-card-name">{member.name}</h2>
                <span className="about-card-role">{member.role}</span>
                <p className="about-card-skills">{member.skills}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="about-card-linkedin"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
