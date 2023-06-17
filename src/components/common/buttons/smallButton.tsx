import React from 'react';
import LoadingSpinner from '../animations/loadingSpinner';

type Buttontype = 'button' | 'reset' | 'submit';

interface IButtonProps {
  text: string;
  onClick?: () => void;
  type?: Buttontype;
  disable?: boolean;
  style?: string;
}

const SmallButton = (props: IButtonProps) => {
  const { text, onClick, type, disable, style } = props;
  return (
    <button
      className={`max-w-[100px] w-full rounded-lg p-2 bg-yellow text-grey-90 text-body-2/b1 hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`}
      onClick={onClick}
      type={type ? type : 'button'}
      disabled={disable}
    >
      {disable ? <LoadingSpinner /> : text}
    </button>
  );
};

export default SmallButton;
