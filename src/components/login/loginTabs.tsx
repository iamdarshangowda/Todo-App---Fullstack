'use client';

import React, { Fragment, useEffect, useMemo } from 'react';
import { Transition } from '@headlessui/react';
import { useToggleContext } from '@context/useToggleContext';
import GetStarted from './getStarted';
import LoginForm from './loginForm';
import SignupForm from './signupForm';
import { get } from '../../config/axiosClient';
import { useRouter } from 'next/navigation';
import { useUIHelperContext } from '@context/useUIHelperContext';

const LoginTabs = () => {
  const router = useRouter();
  const { currentTab } = useToggleContext();
  const { setLoading } = useUIHelperContext();

  const handleVerifyToken = async () => {
    setLoading(true);
    try {
      await get('user/verify').then((data) => {
        const { tokenValid } = data.data;
        if (tokenValid) {
          router.push('/tasks/today');
        } else {
          setLoading(false);
        }
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('todoAuthToken');

    if (isLoggedIn) {
      handleVerifyToken();
    }
  }, []);

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
