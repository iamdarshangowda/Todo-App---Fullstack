'use client';

import React, { Fragment, useMemo } from 'react';
import { Transition } from '@headlessui/react';
import { useToggleContext } from '@context/useToggleContext';
import GetStarted from './getStarted';
import LoginForm from './loginForm';
import SignupForm from './signupForm';

const LoginTabs = () => {
  const { currentTab } = useToggleContext();

  const screenConfig = useMemo(() => {
    return {
      '0': <GetStarted />,
      '1': <LoginForm />,
      '2': <SignupForm />,
    };
  }, []);

  return (
    <Fragment>
      {Object.entries(screenConfig).map(([key, Screen]) => (
        <Transition key={key} show={Number(key) === currentTab} as={Fragment}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-50"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 translate-x-0"
            leave="ease-in duration-50"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 scale-95"
          >
            {Screen}
          </Transition.Child>
        </Transition>
      ))}
    </Fragment>
  );
};

export default LoginTabs;
