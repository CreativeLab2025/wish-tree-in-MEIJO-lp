import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/wish-tree-in-MEIJO-lp' : '',
  assetPrefix: isProd ? '/wish-tree-in-MEIJO-lp/' : '',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
