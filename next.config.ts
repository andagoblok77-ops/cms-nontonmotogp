import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blogger.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.bp.blogspot.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "livemotogp.com",
          },
        ],
        destination: "https://www.livemotogp.my.id/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.livemotogp.com",
          },
        ],
        destination: "https://www.livemotogp.my.id/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
