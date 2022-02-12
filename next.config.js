/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com']
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.child_process = false;
      config.resolve.fallback.fs = false;
    }

    return config;
  },
}
