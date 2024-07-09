/** @type {import('next').NextConfig} */


module.exports = {
  async redirects() {
    return [
      {
        source: '/uav',
        destination: '/posts?tags=drone',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ghchart.rshah.org',
        port: '',
        pathname: '/maxortner01'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  reactStrictMode: true
}