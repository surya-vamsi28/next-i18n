/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/global/:path*',
            destination: '/:path*',
          },
        ]
      },
};

export default nextConfig;
