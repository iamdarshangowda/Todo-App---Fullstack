import React from "react";

interface IButtonProps {
  text: string;
  style?: string;
}

const PrimaryButton = (props: IButtonProps) => {
  const { text, style } = props;
  return (
    <button
      className={`max-w-lg w-full rounded-xl h-12 bg-yellow text-grey-90 text-body-1/b1 hover:bg-yellow_hover ${style}`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
