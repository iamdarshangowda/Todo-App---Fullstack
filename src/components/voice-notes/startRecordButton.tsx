import React from 'react';

interface IRecordButtonProps {
  handleRecord: (stream: any) => void;
}

const StartRecordButton = (props: IRecordButtonProps) => {
  const { handleRecord } = props;

  return (
    <button className="w-12 h-12 bg-red rounded-full" onClick={handleRecord}></button>
  );
};

export default StartRecordButton;
