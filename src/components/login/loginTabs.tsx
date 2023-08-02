'use client';

import React, { Fragment, useEffect } from 'react';
import { useToggleContext } from '@context/useToggleContext';
import GetStarted from './getStarted';
import LoginForm from './loginForm';
import SignupForm from './signupForm';
import { useRouter } from 'next/navigation';
import { useUIHelperContext } from '@context/useUIHelperContext';
import verifyToken from '../../apis/handleVerifyToken';

const LoginTabs = () => {
  const router = useRouter();
  const { currentTab } = useToggleContext();
  const { setLoading } = useUIHelperContext();

  const handleVerifyToken = async () => {
    setLoading(true);
    const isTokenValid = await verifyToken();
    if (isTokenValid) {
      router.replace('/tasks/today');
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('todoAuthToken');

    if (isLoggedIn) {
      handleVerifyToken();
    }
  }, []);

  const data = {
    0: <GetStarted />,
    1: <LoginForm />,
    2: <SignupForm />,
  }[currentTab];

  return <Fragment>{data}</Fragment>;
};

export default LoginTabs;
