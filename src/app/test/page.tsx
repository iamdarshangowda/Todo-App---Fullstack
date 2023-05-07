'use client';
import React, { useState } from 'react';

const data = ['one', 'two', 'three', 'four', 'five', 'six'];

const Test = () => {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(true);
  return (
    <div className="flex overflow-hidden">
      <div
        className={`z-20 bg-red-300 transition duration-300   ${
          isLeftOpen ? 'w-[80vw] sm:w-[calc(1%*25)]' : 'w-0 -translate-x-full'
        }`}
      >
        <div
          className={`w-[80vw] sm:w-[calc(1vw*25)] h-[100vh] transition duration-700 overflow-auto scrollbar-hide ${
            isLeftOpen ? '' : '-translate-x-full'
          }`}
        >
          Left Sidebar
          <button onClick={() => setIsLeftOpen((prev) => !prev)}>Left</button>
          {data.map((item) => (
            <div className="h-52 w-full bg-red-300">{item}</div>
          ))}
        </div>
      </div>

      <div
        className={`bg-grey-30 flex-grow transition duration-300 flex flex-col gap-10 text-center overflow-auto`}
      >
        Main
        <button onClick={() => setIsLeftOpen((prev) => !prev)}>Left</button>
        <button onClick={() => setIsRightOpen((prev) => !prev)}>Right</button>
      </div>

      <div
        className={`z-10 bg-green-300 transition duration-300 ${
          isRightOpen ? 'w-[80vw] sm:w-[calc(1%*25)]' : 'w-0 translate-x-full'
        }`}
      >
        <div
          className={`w-[80vw] sm:w-[calc(1vw*25)] h-[100vh] transition duration-700  ${
            isRightOpen ? '' : 'translate-x-full'
          }`}
        >
          Right Sidebar
          <button onClick={() => setIsRightOpen((prev) => !prev)}>Right</button>
        </div>
      </div>
    </div>
  );
};

export default Test;
