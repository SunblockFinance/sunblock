// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT

// const securityHeaders = []

// module.exports = {
//   async headers() {
//     return [
//         {
//           source: '/(.*)',
//           headers: [
//             {
//               key: 'Content-Security-Policy',
//               value:
//                 "default-src 'self'; font-src 'self' 'https://fonts.googleapis.com'; img-src 'self' *.somewhere.com; script-src 'self'",
//             },
//             {
//               key: 'X-Frame-Options',
//               value: 'DENY',
//             },
//             {
//               key: 'X-Content-Type-Options',
//               value: 'nosniff',
//             },
//             {
//               key: 'Referrer-Policy',
//               value: 'origin-when-cross-origin',
//             },
//             {
//               key: 'Permissions-Policy',
//               value: "camera=(); battery=(self); geolocation=(); microphone=('https://somewhere.com')",
//             },
//           ],
//         },
//       ];
//   },
// };
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  // Your existing module.exports
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }
    return config
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

/** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
// }
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})
// module.exports = {
//   webpack: (config, { dev, isServer }) => {
//     if (!dev && !isServer) {
//       Object.assign(config.resolve.alias, {
//         react: 'preact/compat',
//         'react-dom/test-utils': 'preact/test-utils',
//         'react-dom': 'preact/compat',
//       })
//     }
//     return config
//   },
// }
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);