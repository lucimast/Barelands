/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build", // Updated to ensure output directory is 'build'
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
