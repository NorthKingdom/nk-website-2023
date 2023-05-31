const path = require('path')
const pkg = require('./package.json')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    version: pkg.version,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `
          @import "@styles/fonts.scss";
          @import "@styles/variables.scss";
          @import "@styles/functions.scss";
          @import 'styles/mixins/notch.scss';
          @import "@styles/mixins/_base.scss";
          @import "@styles/mixins/typography.scss";
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

module.exports = withBundleAnalyzer(nextConfig)
