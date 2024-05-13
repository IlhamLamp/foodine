/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MIDTRANS_API_URL: process.env.MIDTRANS_API_URL,
        MIDTRANS_APP_URL: process.env.MIDTRANS_APP_URL,
        MIDTRANS_CLIENT_KEY: process.env.MIDTRANS_CLIENT_KEY,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'platform-lookaside.fbsbx.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
};

export default nextConfig;
