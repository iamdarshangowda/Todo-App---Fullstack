/** @type {import('next').NextConfig} */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === 'development',
  skipWaiting: true,
  runtimeCaching,
  customWorkerDir: 'serviceworker',
});

const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    TODO_BACKED_PORT: process.env.TODO_BACKED_PORT,
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

module.exports = withPWA(nextConfig);
