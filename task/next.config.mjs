/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
  domains: [
    'lastminutedeal.s3.ap-southeast-2.amazonaws.com',
    'lastminutessdeal.s3.ap-south-1.amazonaws.com', // ✅ Add this
    'example.com',
    'lh3.googleusercontent.com',
    'cdn.shopify.com',
  ],
},

  //     ignoreBuildErrors: true,

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}



export default nextConfig;
