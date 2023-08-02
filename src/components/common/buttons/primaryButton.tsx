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
      className={`max-w-lg w-full rounded-xl h-12 bg-yellow_hover text-grey-90 text-body-1/b1 hover:bg-yellow`}
      onClick={onClick}
      type={type ? type : 'button'}
      disabled={disable}
    >
      {disable ? <LoadingSpinner /> : text}
    </button>
  );
};

export default PrimaryButton;
