import { useToggleContext } from '@context/useToggleContext';
import React, { FunctionComponent, useEffect } from 'react';
import { CloseIcon } from '../icons/icons';
import { initialToast } from '@utils/initialData';

const ErrorToast: FunctionComponent = () => {
  const { showErrorToast, setShowErrorToast } = useToggleContext();

  useEffect(() => {
    const clearToast = setTimeout(() => {
      setShowErrorToast(initialToast);
    }, 3000);

    return () => {
      clearTimeout(clearToast);
    };
  }, [showErrorToast]);

  const handleCloseToast = () => {
    setShowErrorToast(initialToast);
  };

  return (
    <div
      className="max-w-xs w-full bg-white border rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700 absolute top-5 right-5 left-5 mx-auto z-10 "
      role="alert"
    >
      <div className="flex p-4 justify-between">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-4 w-4 text-red-500 mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="red"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-700 dark:text-gray-400">
              {showErrorToast.message}
            </p>
          </div>
        </div>
        <div onClick={handleCloseToast} className="hover:cursor-pointer">
          <CloseIcon fill="white" />
        </div>
      </div>
    </div>
  );
};

export default ErrorToast;
