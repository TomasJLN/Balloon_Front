import React, { useState } from 'react';
import './accordion.css';

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  console.log(title, content, isActive);

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <span>{title}</span>
        <span>{isActive ? '-' : '+'}</span>
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  );
};

export default Accordion;
{
}
