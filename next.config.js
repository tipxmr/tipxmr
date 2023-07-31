/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.child_process = false;
      config.resolve.fallback.fs = false;
      config.externals = {
        bufferutil: "bufferutil",
      "utf-8-validate": "utf-8-validate",
      }
    }

    return config;
  },
};
