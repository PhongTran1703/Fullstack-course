import React from 'react';
import cat1 from './cat1.jpg';


const View1 = () => {
  return (
    <div>
      <h2>This is a neutral cat</h2>

      <img src={cat1} alt="cat1" style={{ width: '600px', height: '600px' }} />
    </div>
  );
};

export default View1;
