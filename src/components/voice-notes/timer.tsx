import React from "react";

type Timer = {
  duration: number;
  onStart: () => void;
  onStop: (stream: any) => void;
  isRecording: boolean;
  isRecordDataExists: Blob | undefined;
  handleSave: () => void;
  handleRestart: () => void;
};

const Timer = (props: Timer) => {
  const {
    duration,
    onStart,
    onStop,
    isRecording,
    isRecordDataExists,
    handleSave,
    handleRestart,
  } = props;

  return (
    <div>
      <div className="relative">
        <div
          className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2
         text-6xl text-white "
        >
          <span>{duration}s</span>
        </div>
        <svg width="300" height="300">
          <circle
            id="circle1"
            cx="150"
            cy="150"
            r="120"
            strokeWidth="5px"
            fill="transparent"
            strokeLinecap="round"
            stroke="rgba(0,0,0, .4)"
          ></circle>
          <circle
            id="circle2"
            cx="150"
            cy="150"
            r="120"
            strokeWidth="5px"
            fill="#0079FF"
            strokeLinecap="round"
            stroke="#bbe1fa"
            className="transition-all"
          ></circle>
        </svg>
      </div>

      <div className="my-2 flex gap-2 justify-center text-grey-90 text-body-1/b1">
        {isRecording ? (
          <button
            className="max-w-[180px] w-full rounded-xl h-12  hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
          dark:hover:shadow-grey-40 bg-yellow"
            onClick={onStop}
          >
            STOP
          </button>
        ) : (
          <div className="flex gap-2 w-full justify-center">
            <button
              className="max-w-[180px] w-full rounded-xl h-12  border border-grey-30 hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
          bg-red"
              onClick={isRecordDataExists ? handleRestart : onStart}
            >
              {isRecordDataExists ? "RESTART" : "START"}
            </button>
            {isRecordDataExists && (
              <button
                className="max-w-[180px] w-full rounded-xl h-12  hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
            dark:hover:shadow-grey-40 bg-[#D6D46D]"
                onClick={handleSave}
              >
                SAVE NOTE
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;
