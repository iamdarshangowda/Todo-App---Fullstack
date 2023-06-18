import React from 'react';

interface IListIconProps {
  bgColor?: string;
  size?: string;
}

const ListIocnBox = (props: IListIconProps) => {
  const { bgColor, size } = props;
  return <div className={`h-5 w-5 bg-grey-90 rounded-md ${bgColor} ${size}`}></div>;
};

export default ListIocnBox;
