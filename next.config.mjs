/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // This allows the glassmorphism blurs to work without image optimization errors
    images: { unoptimized: true } 
};

export default nextConfig;