/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/Ev-Bus-Bahawalpur",

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
