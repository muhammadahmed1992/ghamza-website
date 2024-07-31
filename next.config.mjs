/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
    optimizePackageImports: ["@/components/"],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ghmza-assets.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};
export default nextConfig;
