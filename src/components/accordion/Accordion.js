import { useState } from 'react';
import './accordion.css';

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <span>{title}</span>
        <span>{isActive ? '-' : '+'}</span>
      </div>
      {isActive && <div className="accordion-content fade_in">{content}</div>}
    </div>
  );
};

export default Accordion;
