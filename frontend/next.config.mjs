/** @type {import('next').NextConfig} */
const nextConfig = {
  // Uncomment for static export (for IPFS deployment)
  // output: 'export',
  // distDir: 'dist',
  
  // Image optimization config
  images: {
    unoptimized: true,
  },
  
  // Environment variables that should be available at build time
  env: {
    NEXT_PUBLIC_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  },
};

export default nextConfig;
