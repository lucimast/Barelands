/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build", // Updated to ensure output directory is 'build'
  trailingSlash: true, // Add trailing slashes to URLs
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_PRESET_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME,
  },
  output: 'export', // Enable static site generation for GitHub Pages deployment
  
  // Disable ESLint during production build since we're making a static site
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Skip trailing slash redirects
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
};

export default nextConfig;
