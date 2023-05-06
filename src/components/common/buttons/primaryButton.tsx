import React from 'react';

type Buttontype = 'button' | 'reset' | 'submit';

interface IButtonProps {
  text: string;
  onClick?: () => void;
  type?: Buttontype;
}

const PrimaryButton = (props: IButtonProps) => {
  const { text, onClick, type } = props;
  return (
    <button
      className={`max-w-lg w-full rounded-xl h-12 bg-yellow text-grey-90 text-body-1/b1
      transition ease-in-out delay-250 hover:shadow-md hover:scale-95 hover:transition-all
      hover:duration-300`}
      onClick={onClick}
      type={type ? type : 'button'}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
