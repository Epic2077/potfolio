import { imageHosts } from './image-hosts.config.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  distDir: process.env.DIST_DIR || '.next',

  images: {
    remotePatterns: imageHosts,
    minimumCacheTTL: 60,
  },
};
export default nextConfig;
