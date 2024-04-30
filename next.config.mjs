/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.dualstack.eu-west-1.amazonaws.com',
        port: '443',
        pathname: '/comecome/**',
      },
    ],
  },
}

export default nextConfig
