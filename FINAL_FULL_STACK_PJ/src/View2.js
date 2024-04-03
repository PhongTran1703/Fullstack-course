import React from 'react';
import cat2 from './cat2.jpg';


const View2 = () => {
  return (
    <div>
      <h2>This is a sad cat</h2>

      <img src={cat2} alt="cat2" style={{ width: '600px', height: '600px' }} />
    </div>
  );
};

export default View2;
