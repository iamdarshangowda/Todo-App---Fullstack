import React from 'react';

type Buttontype = 'button' | 'reset' | 'submit';

interface ITextButtonProps {
  text: string;
  onClick?: () => void;
  type?: Buttontype;
}

const TextButton = (props: ITextButtonProps) => {
  const { text, onClick, type } = props;

  return (
    <button
      className="text-body-2/b1 text-grey-90 text-center mx-auto hover: cursor-pointer hover:scale-105 hover:transition-all"
      onClick={onClick}
      type={type ? type : 'button'}
    >
      {text}
    </button>
  );
};

export default TextButton;
