const path = require('path')
const pkg = require('./package.json')

/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    version: pkg.version,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: `
      @import '~sass-mq';
    `,
  },
  images: {
    unoptimized: true,
    domains: ['images.ctfassets.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
