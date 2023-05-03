/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    TODO_BACKED_PORT: process.env.TODO_BACKED_PORT,
  },
};

module.exports = nextConfig;
