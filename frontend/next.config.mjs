/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@ant-design",
    "antd",
    "rc-util",
    "rc-pagination",
    "rc-picker",
  ],
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:5000',
  },
};

export default nextConfig;
