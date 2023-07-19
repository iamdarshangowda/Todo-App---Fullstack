import { useToggleContext } from '@context/useToggleContext';
import React, { FunctionComponent, useEffect } from 'react';
import { CloseIcon } from '../icons/icons';
import { initialToast } from '@utils/initialData';

const SuccessToast: FunctionComponent = () => {
  const { showSuccessToast, setShowSuccessToast } = useToggleContext();

  useEffect(() => {
    const clearToast = setTimeout(() => {
      setShowSuccessToast(initialToast);
    }, 3000);

    return () => {
      clearTimeout(clearToast);
    };
  }, [showSuccessToast]);

  const handleCloseToast = () => {
    setShowSuccessToast(initialToast);
  };

  return (
    <div
      className="max-w-xs w-full bg-white border rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700 absolute top-5 right-5 mx-auto z-10 "
      role="alert"
    >
      <div className="flex p-4 justify-between">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-4 w-4 mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="green"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm">{showSuccessToast.message}</p>
          </div>
        </div>
        <div onClick={handleCloseToast} className="hover:cursor-pointer">
          <CloseIcon fill="white" />
        </div>
      </div>
    </div>
  );
};

export default SuccessToast;
