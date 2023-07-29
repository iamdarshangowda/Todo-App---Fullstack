import React from 'react';

interface IListIconProps {
  bgColor: string;
  size?: string;
}

const ListIocnBox = (props: IListIconProps) => {
  const { bgColor, size } = props;
  return (
    <div
      className={`h-5 w-5 rounded-md ${size}`}
      style={{
        backgroundColor: bgColor,
      }}
    ></div>
  );
};

export default ListIocnBox;
