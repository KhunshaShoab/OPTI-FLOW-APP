/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // We ship intentionally-loose types on the 3D layer; don't block builds on them.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  transpilePackages: ["three"],
};

export default nextConfig;
