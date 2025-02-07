/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "api.dev-nanard.fr",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.api.dev-nanard.fr",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.travauxef.fr",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.peinture.travauxef.fr",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self' blob:; " +
              "connect-src 'self' https://api.dev-nanard.fr https://www.api.dev-nanard.fr https://lh3.googleusercontent.com data: blob:; " +
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' https: data:; " +
              "font-src 'self' data:; " +
              "frame-src 'self' blob:;",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  serverExternalPackages: ["@react-pdf/renderer"],
};

export default nextConfig;
