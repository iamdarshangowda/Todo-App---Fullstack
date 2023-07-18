import React from 'react';

interface ISpinnerProps {
  style?: string;
}
const LoadingSpinner = (props: ISpinnerProps) => {
  const { style } = props;
  return (
    <span
      className={`inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.25em]
       text-white motion-reduce:animate-[spin_1.5s_linear_infinite] ${style}`}
      role="status"
    ></span>
  );
};

export default LoadingSpinner;
