import React from 'react';

const Navbar = ({ setActiveView }) => {
  return (
    <div className="navbar-container navbar">
      <button className="button-large" onClick={() => setActiveView('view1')}>Neutral cat</button>
      <button className="button-large" onClick={() => setActiveView('view2')}>Sad cat</button>
      <button className="button-large" onClick={() => setActiveView('view3')}>Angry cat</button>
      <button className="button-large info-button" onClick={() => setActiveView('info')}>Info</button>
    </div>
  );
};

export default Navbar;
