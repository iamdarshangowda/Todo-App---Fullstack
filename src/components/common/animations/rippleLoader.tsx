import React from 'react';
import './ripple.css';

const RippleLoader = () => {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
};

export default RippleLoader;
