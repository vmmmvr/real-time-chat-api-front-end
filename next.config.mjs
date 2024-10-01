/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/auth',
            destination: '/auth/sign-in',
            permanent: true,
          },
        ];
      },
};

export default nextConfig;
