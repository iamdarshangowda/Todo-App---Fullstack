import React from 'react';

type Buttontype = 'button' | 'reset' | 'submit';

interface IButtonProps {
  text: string;
  onClick?: () => void;
  type?: Buttontype;
  icon?: JSX.Element;
  disable?: boolean;
}

const SecondaryButton = (props: IButtonProps) => {
  const { text, onClick, type, icon, disable } = props;
  return (
    <button
      className={`max-w-[150px] w-full rounded-xl h-12 bg-grey-0 text-grey-90 text-body-1/b1
       hover:bg-grey-10 border`}
      onClick={onClick}
      type={type ? type : 'button'}
      disabled={disable}
    >
      <div className="flex items-center justify-center gap-4">
        {icon}
        {text}
      </div>
    </button>
  );
};

export default SecondaryButton;
