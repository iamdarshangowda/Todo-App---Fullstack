'use client';

import { useThemeContext } from '@context/ThemeContext';
import React from 'react';

const DarkModeToggle = () => {
  const { toggle, mode } = useThemeContext();

  return (
    <div
      className="w-12 h-6 border-[1.5px] border-solid border-[#53c28b70] rounded-[30px] flex items-center justify-between p-1 relative cursor-pointer"
      onClick={toggle}
    >
      <div className="text-[12px]">🌙</div>
      <div className="text-[12px]">🔆</div>
      <div
        className="w-5 h-5 bg-[#53c28b] rounded-full absolute"
        style={mode === 'light' ? { left: '1.5px' } : { right: '1.5px' }}
      />
    </div>
  );
};

export default DarkModeToggle;
