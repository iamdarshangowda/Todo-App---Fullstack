import React from 'react';
import LoadingSpinner from '../animations/loadingSpinner';

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
      className={`max-w-[180px] w-full rounded-xl h-12 dark:bg-grey-10 text-grey-90 text-body-1/b1
       hover:bg-grey-10 border border-grey-30 hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] dark:hover:shadow-grey-40`}
      onClick={onClick}
      type={type ? type : 'button'}
      disabled={disable}
    >
      {disable ? (
        <LoadingSpinner style={text === 'Delete Task' ? '!text-red' : ''} />
      ) : (
        <div className="flex items-center justify-center gap-4">
          {icon}
          {text}
        </div>
      )}
    </button>
  );
};

export default SecondaryButton;
