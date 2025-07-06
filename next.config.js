/** @type {import('next').NextConfig} */
export default {
  pageExtensions: ["tsx", "jsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jsonplaceholder.typicode.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
