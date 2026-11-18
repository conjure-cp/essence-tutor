import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
      serverExternal: ['fs']
    },
  },
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
};

export default nextConfig;
