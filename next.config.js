/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
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
      };
    }

    // else {
    //   config.externals = {
    //     "web-worker": "web-worker",
    //   };
    // }

    return config;
  },
};

export default config;
