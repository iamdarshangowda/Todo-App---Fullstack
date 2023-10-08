import React from 'react';

interface IRecordButtonProps {
  handleRecord: (stream: any) => void;
}

const StopRecordButton = (props: IRecordButtonProps) => {
  const { handleRecord } = props;

  return <button className="w-12 h-12 bg-red rounded-sm" onClick={handleRecord}></button>;
};

export default StopRecordButton;
