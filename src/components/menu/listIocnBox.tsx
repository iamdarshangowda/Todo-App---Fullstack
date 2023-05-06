import React from 'react';

interface IListIconProps {
  bgColor?: string;
}

const ListIocnBox = (props: IListIconProps) => {
  const { bgColor } = props;
  return <div className={`h-5 w-5 bg-red-500 rounded-md ${bgColor}`}></div>;
};

export default ListIocnBox;
