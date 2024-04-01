/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "demo-s3-bucket-iuh.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "kenh14cdn.com",
      },
      {
        protocol: "https",
        hostname: "images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com",
      },
    ],
  },
};

export default nextConfig;
