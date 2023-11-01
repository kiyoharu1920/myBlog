/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["tsx", "jsx"],
  images: {
    domains: ["jsonplaceholder.typicode.com", "via.placeholder.com"],
  },
};

module.exports = nextConfig;
