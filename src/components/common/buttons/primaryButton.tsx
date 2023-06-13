import React from 'react';
import LoadingSpinner from '../animations/loadingSpinner';

type Buttontype = 'button' | 'reset' | 'submit';

interface IButtonProps {
  text: string;
  onClick?: () => void;
  type?: Buttontype;
  disable?: boolean;
}

const PrimaryButton = (props: IButtonProps) => {
  const { text, onClick, type, disable } = props;
  return (
    <button
      className={`max-w-lg w-full rounded-xl h-12 bg-yellow text-grey-90 text-body-1/b1
      transition ease-in-out delay-250 hover:shadow-md hover:scale-95 hover:transition-all
      hover:duration-300`}
      onClick={onClick}
      type={type ? type : 'button'}
      disabled={disable}
    >
      {disable ? <LoadingSpinner /> : text}
    </button>
  );
};

export default PrimaryButton;
