/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['@prisma/client', 'prisma', 'bcryptjs']
};

export default nextConfig;
