const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const config = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
      config.resolve.fallback.child_process = false
      config.resolve.fallback.net = false
      config.resolve.fallback.dns = false
      config.resolve.fallback.tls = false
    }
    return config
  },
  env: {
    BUILD_DATE: new Date().toISOString(),
    // Heroku では SOURCE_VERSION 環境変数から commit hash を参照できます
    COMMIT_HASH: process.env.SOURCE_VERSION || '',
  },
}

module.exports = withBundleAnalyzer(config)
