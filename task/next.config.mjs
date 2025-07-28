/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  images: {
    domains: [
      'lastminutedeal.s3.ap-southeast-2.amazonaws.com',
      'example.com',
      'lh3.googleusercontent.com',
      'cdn.shopify.com',
      "lastminutessdeal.s3.ap-south-1.amazonaws.com"

      // any other hosts you fetch images from…
    ],
    // alternatively, you can use `remotePatterns` for more control:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'lastminutedeal.s3.ap-southeast-2.amazonaws.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}



export default nextConfig;
