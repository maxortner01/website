/** @type {import('next').NextConfig} */


module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ghchart.rshah.org',
        port: '',
        pathname: '/maxortner01'
      },
    ],
  },
  reactStrictMode: true
}