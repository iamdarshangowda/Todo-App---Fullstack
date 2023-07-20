'use client';

import { createContext, useContext, useState } from 'react';

const initialData = {
  mode: 'dark',
  toggle: '',
};

interface context {
  toggle: any;
  mode: any;
}

interface contextProviderProp {
  children: any;
}

export const ThemeContext = createContext<context>(initialData);

export const ThemeWrapper: React.FunctionComponent<contextProviderProp> = ({
  children,
}) => {
  const [mode, setMode] = useState<string>('dark');

  const toggle = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
