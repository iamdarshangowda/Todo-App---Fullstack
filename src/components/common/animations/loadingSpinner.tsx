import React from 'react';

const LoadingSpinner = () => {
  return (
    <span
      className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.25em] text-white motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    ></span>
  );
};

export default LoadingSpinner;
