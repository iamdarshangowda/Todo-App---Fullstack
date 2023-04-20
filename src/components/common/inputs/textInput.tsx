import React from "react";

interface IInputProps {
  type: string;
  placeholder: string;
  name: string;
}

const TextInput = (props: IInputProps) => {
  const { type, placeholder, name } = props;

  return (
    <input
      type={type}
      id={name}
      name={name}
      className="w-full p-2 text-grey-40 border border-grey-20 rounded-lg"
      placeholder={placeholder}
    />
  );
};

export default TextInput;
